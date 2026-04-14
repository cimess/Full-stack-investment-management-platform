import { Roles } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { prisma } from "../lib/prisma.js";
import type { AuthRequest } from "../middlewear/auth.js";
import redisClient from "../lib/redis.js";
import { trace ,context} from "@opentelemetry/api";

export const add_manager_to_client = async (req: Request, res: Response, next: NextFunction) => {

  const { manager_id } = req.body;
  const client_id = req.user?.id;

  if (req.user?.roles !== Roles.USER) {
    return next(createError(401, "only user can add manager to client"));
  }
  if (!client_id || !manager_id) {
    return next(createError(400, "client id and manager id are required"));
  }


  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: client_id
        }
      })

      if (user?.roles !== Roles.USER) {
        throw createError(401, "only user can add manager to client");
      }
      if (user?.restricted) {
        throw createError(401, "user is currently restricted");
      }
      if (!user?.isVerified) {
        throw createError(401, "user is currently not verified");
      }
      if (user?.manager_id) {
        throw createError(401, "manager already assigned to client");
      }
      const manager = await tx.manager.findUnique({ where: { id: manager_id } });
      if (!manager || manager.manager_slot <= 0) throw createError(401, "Manager has no available slots");
      const add_manager = await tx.manager.update({
        where: {
          id: manager_id
        },
        data: {
          managed_by: {
            connect: {
              id: client_id
            }
          },
          manager_slot: {
            decrement: 1
          }
        }
      })
      if (!add_manager) {
        throw createError(500, "Internal Server Error");
      }

    }, {
      timeout: 30000
    })


    if (redisClient) {
      await redisClient.del(`dashboard:${client_id}`);
      const managerRecord = await prisma.manager.findUnique({ where: { id: manager_id } });
      if (managerRecord) {
        await redisClient.del(`manager_dashboard:${managerRecord.manager_id}`);
      }
    }

    res.status(200).json({ success: true, message: "manager added to client successfully" })
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
}


export const remove_manager_to_client = async (req: Request, res: Response, next: NextFunction) => {

  const { manager_id } = req.body;
  const client_id = req.user?.id;

  if (req.user?.roles !== Roles.USER) {
    return next(createError(401, "only user can remove manager to client"));
  }
  if (!client_id || !manager_id) {
    return next(createError(400, "client id and manager id are required"));
  }

  try {

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: client_id
        }
      })

      if (user?.roles !== Roles.USER) {
        throw createError(401, "only user can remove manager to client");
      }
      if (user?.restricted) {
        throw createError(401, "user is currently restricted");
      }
      if (!user?.isVerified) {
        throw createError(401, "user is currently not verified");
      }
      logger.info(user.manager_id)
      logger.info(manager_id)
      if (user?.manager_id !== manager_id) {
        throw createError(401, "manager not assigned to client");
      }

      try {
        const remove_manager = await tx.manager.update({
          where: { id: manager_id },
          data: {
            managed_by: { disconnect: { id: client_id } },
            manager_slot: { increment: 1 }
          }
        });

      } catch (error: any) {
        // P2025 is the official Prisma code for "Record to update not found"
        if (error.code === 'P2025') {
          throw createError(404, "Manager record not found or already removed");
        }
        // If it's something else, re-throw it to be caught by the outer catch
        throw error;
      }

      const update_user = await tx.user.update({
        where: {
          id: client_id
        },
        data: {
          manager_id: null
        }
      })
      if (!update_user) {
        throw createError(500, "Internal Server Error");
      }

    }, {
      timeout: 30000
    })

    if (redisClient) {
      await redisClient.del(`dashboard:${client_id}`);
      const managerRecord = await prisma.manager.findUnique({ where: { id: manager_id } });
      if (managerRecord) {
        await redisClient.del(`manager_dashboard:${managerRecord.manager_id}`);
      }
    }

    res.status(200).json({ success: true, message: "manager removed from client successfully" })
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
}

export const buyStock = async (req: Request, res: Response, next: NextFunction) => {

  const { stock_id, quantity } = req.body;
  const client_id = req.user?.id;

  if (req.user?.roles !== Roles.USER) {
    return next(createError(401, "only user can buy stock"));
  }
  if (!client_id || !stock_id || !quantity) {
    return next(createError(400, "client id and stock id and quantity are required"));
  }

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: client_id
        }
      })

      if (user?.restricted) {
        throw createError(401, "user is currently restricted");
      }
      if (!user?.isVerified) {
        throw createError(401, "user is currently not verified");
      }
      if (!user?.manager_id) {
        throw createError(403, "assign a manager first before requesting for stock");
      }


      let portfolio = await tx.portfolio.findFirst({
        where: {
          user_id: client_id
        }
      })
      if (!portfolio) {
        portfolio = await tx.portfolio.create({
          data: {
            user_id: client_id
          }
        })
      }
      // Robust Stock Identification:
      // 1. Try finding by ID
      // 2. Try finding by Symbol (if stock_id looks like a ticker)
      // 3. Fallback: Fetch info from MarketService and create the stock entry to satisfy Foreign Key
      let stock = await tx.stockTable.findFirst({
        where: {
          OR: [
            { id: stock_id },
            { symbol: stock_id.toUpperCase() }
          ]
        }
      });

      if (!stock) {
        logger.info(`[Trade] New stock detected (${stock_id}). Fetching metadata to seed...`);
        const { getStockDetails } = await import("../services/marketservice.js");
        const details = await getStockDetails(stock_id);
        
        if (details.success && details.data) {
          const d = details.data;
          stock = await tx.stockTable.create({
            data: {
              symbol: d.symbol || stock_id.toUpperCase(),
              company: d.company || stock_id,
              price: d.price || 0,
              changePercent: d.changePercent || 0,
              marketCap: d.marketCap ? BigInt(Math.floor(Number(d.marketCap))) : null,
              assetType: (d.type || 'STOCK').toUpperCase()
            }
          });
        }
      }

      if (!stock) {
        throw createError(404, "Target stock not found in system or market provider.");
      }

      const trade = await tx.trade_request.create({
        data: {
          portfolio_id: portfolio.id,
          stock_id: stock.id,
          quantity,
          type: "BUY",
          status: "PENDING"
        }
      });

      const managerRecord = await tx.manager.findUnique({
        where: { id: user.manager_id }
      });

      if (managerRecord) {
        await tx.notification.create({
          data: {
            user_id: managerRecord.manager_id,
            title: "New Trade Request",
            message: `${user.fullname} requested to BUY ${quantity} shares of ${stock.symbol}.`,
            type: "TRADE"
          }
        });
      }

    }, {
      timeout: 30000
    })


    if (redisClient) {
      await redisClient.del(`dashboard:${client_id}`);
      // Invalidate manager's dashboard cache so they see the new request immediately
      const user = await prisma.user.findUnique({ where: { id: client_id }, select: { manager_id: true } });
      if (user?.manager_id) {
        const managerRecord = await prisma.manager.findUnique({ where: { id: user.manager_id } });
        if (managerRecord) {
          await redisClient.del(`manager_dashboard:${managerRecord.manager_id}`);
        }
      }
    }

    res.status(200).json({ success: true, message: "trade request sent successfully" })
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
}

export const sellStock = async (req: Request, res: Response, next: NextFunction) => {

  const { stock_id, quantity } = req.body;
  const client_id = req.user?.id;

  if (req.user?.roles !== Roles.USER) {
    return next(createError(401, "only user can sell stock"));
  }
  if (!client_id || !stock_id || !quantity) {
    return next(createError(400, "client id and stock id and quantity are required"));
  }


  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: client_id
        }
      })

      if (user?.restricted) {
        throw createError(401, "user is currently restricted");
      }
      if (!user?.manager_id) {
        throw createError(403, "assign a manager first before requesting for stock");
      }
      if (!user?.isVerified) {
        throw createError(401, "user is currently not verified");
      }

      let portfolio = await tx.portfolio.findFirst({
        where: {
          user_id: client_id
        }
      })
      if (!portfolio) {
        throw createError(404, "portfolio not found");
      }
      const stock = await tx.stockTable.findUnique({
        where: {
          id: stock_id
        }
      })
      if (!stock) {
        throw createError(404, "stock not found");
      }
      const trade = await tx.trade_request.create({
        data: {
          portfolio_id: portfolio.id,
          stock_id,
          quantity,
          type: "SELL",
          status: "PENDING"
        }
      });

      const managerRecord = await tx.manager.findUnique({
        where: { id: user.manager_id }
      });

      if (managerRecord) {
        await tx.notification.create({
          data: {
            user_id: managerRecord.manager_id,
            title: "New Trade Request",
            message: `${user.fullname} requested to SELL ${quantity} shares of ${stock.symbol}.`,
            type: "TRADE"
          }
        });
      }

    }, {
      timeout: 30000
    })


    if (redisClient) {
      await redisClient.del(`dashboard:${client_id}`);
      // Invalidate manager's dashboard cache so they see the new request immediately
      const user = await prisma.user.findUnique({ where: { id: client_id }, select: { manager_id: true } });
      if (user?.manager_id) {
        const managerRecord = await prisma.manager.findUnique({ where: { id: user.manager_id } });
        if (managerRecord) {
          await redisClient.del(`manager_dashboard:${managerRecord.manager_id}`);
        }
      }
    }

    res.status(200).json({ success: true, message: "trade request sent successfully" })
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {

  const client_id = req.user?.id;
  const span=trace.getSpan(context.active()); 

  if (req.user?.roles !== Roles.USER) {
    return next(createError(401, "only user can get all transactions"));
  }
  if (!client_id) {
    return next(createError(401, "client id is required"));
  }


  try {
    const cacheKey = `dashboard:${client_id}`;
    if (redisClient) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        span?.setAttribute('cache.hit', true);
        span?.setAttribute('cache.key', cacheKey);

        return res.status(200).json(JSON.parse(cached));
      }
      span?.setAttribute('cache.hit', false);
      span?.setAttribute('cache.key', cacheKey);
    }

    let portfolio = await prisma.portfolio.findFirst({
      where: { user_id: client_id }
    })

    // 4. Fetch User and Manager Info (Fetch early to return it with empty state if needed)
    const user = await prisma.user.findUnique({
      where: { id: client_id },
      select: {
        id: true,
        fullname: true,
        email: true,
        client_manager: {
          select: {
            manager_id: true,
            user: {
              select: {
                fullname: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!portfolio) {
      // Return a successful but empty dashboard state for new users
      const responseData = {
        success: true,
        data: {
          user,
          transactions: [],
          trade_requests: [],
          investments: []
        }
      };

      if (redisClient) {
        await redisClient.set(cacheKey, JSON.stringify(responseData, (key, value) => typeof value === 'bigint' ? value.toString() : value), "EX", 120);
      }

      return res.status(200).json(responseData);
    }

    //  Fetch Actual Transactions (History of executed trades)
    const transactions = await prisma.transaction.findMany({
      where: { portfolio_id: portfolio.id },
      orderBy: { createdAt: 'desc' }, // Good practice: newest first
      select: {
        id: true,
        quantity: true,
        price: true,
        type: true,
        createdAt: true,
        stock: {           // Join the stock table to get the company info
          select: { symbol: true, company: true }
        }
      }
    })

    // 2. Fetch Pending Trade Requests
    const trade_requests = await prisma.trade_request.findMany({
      where: { portfolio_id: portfolio.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        quantity: true,
        type: true,
        status: true,
        createdAt: true,
        response: true,
        stock: {
          select: { symbol: true, company: true }
        }
      }
    })

    // 3. Fetch Current Active Investments (Holdings)
    const investments = await prisma.investment.findMany({
      where: { portfolio_id: portfolio.id },
      select: {
        id: true,
        quantity: true,
        avgPrice: true,
        stock: {
          select: { symbol: true, company: true, price: true }
        }
      }
    })




    const responseData = {
      success: true,
      data: {
        user,
        transactions,
        trade_requests,
        investments
      }
    };

    if (redisClient) {
      await redisClient.set(cacheKey, JSON.stringify(responseData, (key, value) => typeof value === 'bigint' ? value.toString() : value), "EX", 120);
    }

    res.status(200).json(responseData);


  } catch (err: any) {
    logger.error(err);
    next(err);
  }
}
