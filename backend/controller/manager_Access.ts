import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";
import createError from "http-errors";
import { Roles } from "@prisma/client";
import { generateAccessToken, generateRefreshToken } from "../middlewear/auth.js";





export const getManagerAccess = async (req: Request, res: Response, next: NextFunction) => {
  const { access_key } = req.body;
  const userId = req.user?.id;

  if (!access_key) {
    return next(createError(401, "approval code is required"));
  }
  if (!userId) {
    return next(createError(401, "unauthorized"));
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check user eligibility
      const user = await tx.user.findUnique({
        where: { id: userId, roles: Roles.USER}
      });
      if(!user?.isVerified){
        throw createError(401,"User not verified");
      }

      if (!user) {
        throw createError(401, "User already promoted or not found");
      }
      if (user.restricted) {
        throw createError(401, "User is currently restricted");
      }
logger.info(access_key)
      // 2. Verify approval code
      const manager_accessKey = await tx.approved_Manager.findUnique({
        where: {
          user_id: userId,
          is_used: false,
          approval_code: access_key
        }
      });
logger.info(manager_accessKey)
      if (!manager_accessKey) {
        throw createError(409, "Invalid manager approval code");
      }
      if(manager_accessKey.is_used){
        throw createError(409,"already used manager approval code");
      }

      // 3. Clear existing tokens (force fresh session)
      await tx.refreshToken.deleteMany({
        where: { user_id: userId }
      });

      // 4. Update user role
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { roles: Roles.MANAGER }
      });

      // 5. Create manager profile (Check if exists first to be safe, though transaction helps)
      await tx.manager.upsert({
        where: { manager_id: userId },
        update: {
          approval_code: access_key,
          manager_slot: manager_accessKey.manager_slot
        },
        create: {
          manager_id: userId,
          approval_code: access_key,
          manager_slot: manager_accessKey.manager_slot
        }
      });

      // 6. Mark approval code as used
      await tx.approved_Manager.update({
        where: { id: manager_accessKey.id },
        data: { is_used: true }
      });

      // 7. Generate NEW tokens with the NEW role
      const accessToken = generateAccessToken({ id: updatedUser.id, roles: updatedUser.roles });
      const refreshToken = generateRefreshToken({ id: updatedUser.id, roles: updatedUser.roles });

      await tx.refreshToken.create({
        data: {
          token: refreshToken,
          user_id: updatedUser.id
        }
      });

      return { accessToken, refreshToken };
    }, {
      timeout: 30000
    });

    // 8. Set cookies and send response
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ 
      success: true, 
      message: "Manager access granted successfully. Session updated." 
    });

  } catch (err: any) {
    logger.error(err);
    return next(err.statusCode ? err : createError(500, "Internal Server Error"));
  }
}

export const handleRequest=async(req:Request,res:Response,next:NextFunction)=>{

  const {requestId,status,response,price}=req.body;
  const managerId=req.user?.id;
if (!managerId){
  return next(createError(401,"unauthorized"));
}

  if (status === "APPROVED" || status === "SUCCESS") {
    if (!requestId || !response || price === undefined) {
      return next(createError(400, "Provide all required fields: requestId, response, and price"));
    }
  } else if (status === "REJECTED") {
    if (!requestId || !response) {
      return next(createError(400, "Provide all required fields: requestId and response"));
    }
  } else {
    return next(createError(400, "Invalid status. Use APPROVED or REJECTED."));
  }

  try {

await prisma.$transaction(async(tx)=>{
const request=await tx.trade_request.findUnique({
  where:{
    id:requestId,
    status:"PENDING"
  },include:{
    portfolio:true,
    stock: true
  }
})
console.log(request,"request")
      if (!request) {
        throw createError(401, "invalid request id");
      }
      const client = await tx.user.findUnique({
        where: { id: request.portfolio.user_id }
      })

      // Get manager record to check against client.manager_id
      const manager = await tx.manager.findUnique({
        where: { manager_id: managerId }
      })

      if (!manager || client?.manager_id !== manager.id) {
        throw createError(401, "unauthorized to manage this client");
      }

      if (status === "REJECTED") {
        await tx.trade_request.update({
          where: { id: requestId },
          data: { status: "REJECTED", response }
        });
        await tx.notification.create({
          data: {
            user_id: client?.id || '',
            title: "Trade Request Rejected",
            message: response,
            type: "TRADE"
          }
        });
        return; // Success, exit transaction
      }

      const numericPrice = Number(price);
      if (isNaN(numericPrice)) {
        throw createError(400, "Invalid execution price");
      }

      const existing_investment = await tx.investment.findUnique({
        where: {
          portfolio_id_stock_id: {
            portfolio_id: request.portfolio_id,
            stock_id: request.stock_id
          }
        }
      });
console.log(existing_investment,"existing investment")

if(request.type==='BUY'){
if(existing_investment){
              const oldQty = existing_investment.quantity;
            const newQty = request.quantity;
            const oldAvgPrice = Number(existing_investment.avgPrice);
            const newPrice = Number(price);

            const newAvgPrice = (oldQty * oldAvgPrice + newQty * newPrice) / (oldQty + newQty);

            await tx.investment.update({
              where: { id: existing_investment.id },
              data: {
                quantity: oldQty + newQty,
                avgPrice: newAvgPrice
              }
            });
          } else {
            await tx.investment.create({
              data: {
                portfolio_id: request.portfolio_id,
                stock_id: request.stock_id,
                quantity: request.quantity,
                avgPrice: numericPrice
              }
            });
          }
        } else if (request.type === 'SELL') {
          if (!existing_investment || existing_investment.quantity < request.quantity) {
            throw createError(400, "Insufficient stock quantity to sell");
          }

          const remaining_stock = existing_investment.quantity - request.quantity;

          if (remaining_stock <= 0) {
            await tx.investment.delete({
              where: { id: existing_investment.id }
            });
          } else {
            await tx.investment.update({
              where: { id: existing_investment.id },
              data: { quantity: remaining_stock }
            });
          }
        }

        await tx.transaction.create({
          data: {
            portfolio_id: request.portfolio_id,
            stock_id: request.stock_id,
            quantity: request.quantity,
            price: numericPrice,
            type: request.type
          }
        });

        await tx.trade_request.update({
          where: { id: requestId },
          data: { 
            status: "SUCCESS", 
            response,
            approved_by: manager.id 
          }
        });

        await tx.notification.create({
          data: {
            user_id: client.id,
            title: "Trade Request Executed",
            message: `Your ${request.type} request for ${request.quantity} shares of ${request.stock.symbol} was successful.`,
            type: "TRADE"
          }
        });
      }, {
        timeout: 30000
      });

      return res.status(200).json({ 
        success: true, 
        message: status === "REJECTED" ? "Request rejected successfully" : "Trade executed successfully" 
      });
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const managerId = req.user?.id;

  if (!managerId) {
    return next(createError(401, 'Unauthorized'));
  }

  try {
    // Step 0: Fetch the actual Manager record to get its ID
    const manager = await prisma.manager.findUnique({
      where: { manager_id: managerId }
    });

    if (!manager) {
      return next(createError(404, 'Manager profile not found'));
    }

    // Step 1: fetch all clients (basic info) assigned to THIS manager record
    const clientsRaw = await prisma.user.findMany({
      where: {
        manager_id: manager.id,
        roles: Roles.USER,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        restricted: true,
        createdAt: true,
      },
    });

    // Step 2: fetch nested portfolios per client safely
    const clients = await Promise.all(
      clientsRaw.map(async (client) => {
        const result: any = { ...client, portfolio: null, errors: [] };

        try {
          const portfolio = await prisma.portfolio.findMany({
            where: { user_id: client.id },
            select: {
              id: true,
              investment: {
                select: {
                  quantity: true,
                  avgPrice: true,
                  stock: { select: { symbol: true, company: true, price: true } },
                },
              },
              trade_request: {
                orderBy: { createdAt: 'desc' },
                select: {
                  id: true,
                  type: true,
                  status: true,
                  quantity: true,
                  createdAt: true,
                  stock: { select: { symbol: true ,price:true} },
                },
              },
              transaction: {
                orderBy: { createdAt: 'desc' },
                select: {
                  type: true,
                  quantity: true,
                  price: true,
                  createdAt: true,
                  stock: { select: { symbol: true } },
                },
              },
            },
          });
          // Ensure portfolio is returned as an object (the first one) or null, 
          // NOT an array, to match frontend expectations
          result.portfolio = portfolio[0] || null;
        } catch (err: any) {
          logger.error(`Failed fetching portfolio for client ${client.id}:`, err);
          result.errors.push(`Portfolio fetch failed: ${err.message}`);
        }

        return result;
      })
    );

    return res.status(200).json({
      success: true,
      data: clients,
      message: 'success',
    });
  } catch (err: any) {
    logger.error('Failed fetching clients:', err);
    return next(createError(500, 'Internal Server Error'));
  }
};

export const updateManagerProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      bio, title, specialization, years_experience, success_rate, 
      contact_email, availability, linkedin_url, aum_managed 
    } = req.body;
    
    // Admin or the Manager themselves can update
    const userRole = req.user?.roles;
    const isManager = userRole === 'MANAGER';
    const targetUserId = req.body.manager_user_id || req.user?.id; // Allow admin to specify which manager to update

    if (!isManager) {
      return next(createError(403, "Forbidden"));
    }

    if (isManager && targetUserId !== req.user?.id) {
       return next(createError(403, "You can only update your own profile"));
    }

    // Find the manager record directly associated with this user
    const manager = await prisma.manager.findFirst({
      where: { user: { id: targetUserId } }
    });

    if (!manager) {
      return next(createError(404, "Manager profile not found"));
    }

    // dynamically build data object to avoid exactOptionalPropertyTypes errors
    const data: any = {};
    if (bio !== undefined) data.bio = bio;
    if (title !== undefined) data.title = title;
    if (specialization !== undefined) data.specialization = specialization;
    if (years_experience !== undefined) data.years_experience = Number(years_experience);
    if (success_rate !== undefined) data.success_rate = Number(success_rate);
    if (contact_email !== undefined) data.contact_email = contact_email;
    if (availability !== undefined) data.availability = availability;
    if (linkedin_url !== undefined) data.linkedin_url = linkedin_url;
    if (aum_managed !== undefined) data.aum_managed = BigInt(aum_managed);

    const updatedManager = await prisma.manager.update({
      where: { id: manager.id },
      data
    });

    // BigInt serialization fix
    const serializedManager = {
       ...updatedManager,
       aum_managed: updatedManager.aum_managed ? updatedManager.aum_managed.toString() : null
    };

    res.status(200).json({ success: true, message: "Profile updated successfully", data: serializedManager });
  } catch (error) {
    next(error);
  }
};

export const getPublicManagerProfile = async (req: Request, res: Response, next: NextFunction) => {
  const managerId = req.params.managerId as string;

  if (!managerId) {
    return next(createError(400, "Manager ID is required"));
  }

  try {
    const manager = await prisma.manager.findUnique({
      where: { manager_id: managerId },
      include: {
        user: {
          select: {
            fullname: true,
            email: true
          }
        }
      }
    }) as any;

    if (!manager) {
      return next(createError(404, "Manager not found"));
    }

    // Return only necessary public info
    const publicProfile = {
      id: manager.id,
      manager_id: manager.manager_id,
      fullname: manager.user?.fullname || "Unknown",
      title: manager.title,
      specialization: manager.specialization,
      years_experience: manager.years_experience,
      availability: manager.availability
    };

    res.status(200).json({ success: true, data: publicProfile });
  } catch (err: any) {
    logger.error("Error fetching public manager profile:", err);
    next(createError(500, "Internal Server Error"));
  }
};
