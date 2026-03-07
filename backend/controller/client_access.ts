import { Roles } from "../prisma/generated/index.js";
import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { prisma } from "../lib/prisma.js";
import type { AuthRequest } from "../middlewear/auth.js";


export const add_manager_to_client=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const {manager_id}=req.body;
const client_id=req.user?.id;

if(req.user?.roles!==Roles.USER){
  return next(createError(401,"only user can add manager to client"));
}
  if(!client_id || !manager_id){
    return next(createError(401,"client id and manager id are required"));
  }

  try{
    await prisma.$transaction(async(tx)=>{
      const user=await tx.user.findUnique({
        where:{
          id:client_id
        }
      })

      if(user?.roles!==Roles.USER){
  throw createError(401,"only user can add manager to client");
}
    if(user?.restricted){
      throw createError(401,"user is currently restricted");
    }
      if(user?.manager_id){
        throw createError(401,"manager already assigned to client");
      }
        const manager = await tx.manager.findUnique({ where: { manager_id } });
      if (!manager || manager.manager_slot <= 0) throw createError(401, "Manager has no available slots");
    const add_manager=await tx.manager.update({
      where:{
        manager_id:manager_id
      },
      data:{
        managed_by:{
          connect:{
            id:client_id
          }
        },
        manager_slot:{
          decrement:1
        }
      }
    })
    if(!add_manager){
      throw createError(500,"Internal Server Error");
    }

    })


     res.status(200).json({success:true,message:"manager added to client successfully"})
  }catch(err:any){
    logger.error(err);
     next(err);

  }
}


export const remove_manager_to_client=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const {manager_id}=req.body;
const client_id=req.user?.id;

if(req.user?.roles!==Roles.USER){
  return next(createError(401,"only user can remove manager to client"));
}
  if(!client_id || !manager_id){
    return next(createError(401,"client id and manager id are required"));
  }

  try{

    await prisma.$transaction(async(tx)=>{
      const user=await tx.user.findUnique({
        where:{
          id:client_id
        }
      })

      if(user?.roles!==Roles.USER){
  throw createError(401,"only user can remove manager to client");
}
    if(user?.restricted){
      throw createError(401,"user is currently restricted");
    }
      if(user?.manager_id!==manager_id){
        throw createError(401,"manager not assigned to client");
      }

    const remove_manager=await tx.manager.update({
      where:{
        manager_id:manager_id
      },
      data:{
        managed_by:{
          disconnect:{
            id:client_id
          }
        }
      }
    })
    if(!remove_manager){
      throw createError(500,"Internal Server Error");
    }

    })

     res.status(200).json({success:true,message:"manager removed from client successfully"})
  }catch(err:any){
    logger.error(err);
   next(err);
  }
}

export const buyStock=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const {stock_id,quantity}=req.body;
  const client_id=req.user?.id;

  if(req.user?.roles!==Roles.USER){
    return next(createError(401,"only user can buy stock"));
  }
  if(!client_id || !stock_id || !quantity){
    return next(createError(401,"client id and stock id and quantity are required"));
  }

  try{
    await prisma.$transaction(async(tx)=>{
      const user=await tx.user.findUnique({
        where:{
          id:client_id
        }
      })

  if(user?.restricted){
    throw createError(401,"user is currently restricted");
  }
    if(!user?.manager_id){
      throw createError(401,"assign a manager first before requesting for stock");
    }

    let portfolio=await tx.portfolio.findFirst({
      where:{
        user_id:client_id
      }
    })
    if(!portfolio){
      portfolio=await tx.portfolio.create({
        data:{
          user_id:client_id
        }
      })
    }
const stock=await tx.stockTable.findUnique({
  where:{
    id:stock_id
  }
})
if(!stock){
  throw createError(401,"stock not found");
}
 await tx.trade_request.create({
      data: {
        portfolio_id: portfolio.id,
        stock_id,
        quantity,
        type:"BUY",
        status: "PENDING"
      }
    });

})


res.status(200).json({success:true,message:"trade request sent successfully"})
}catch(err:any){
      logger.error(err);
      next(err);
    }
}

export const sellStock=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const {stock_id,quantity}=req.body;
  const client_id=req.user?.id;

  if(req.user?.roles!==Roles.USER){
    return next(createError(401,"only user can sell stock"));
  }
  if(!client_id || !stock_id || !quantity){
    return next(createError(401,"client id and stock id and quantity are required"));
  }

  try{
    await prisma.$transaction(async(tx)=>{
      const user=await tx.user.findUnique({
        where:{
          id:client_id
        }
      })

  if(user?.restricted){
    throw createError(401,"user is currently restricted");
  }
    if(!user?.manager_id){
      throw createError(401,"assign a manager first before requesting for stock");
    }

    let portfolio=await tx.portfolio.findFirst({
      where:{
        user_id:client_id
      }
    })
    if(!portfolio){
   throw createError(401,"portfolio not found");
    }
const stock=await tx.stockTable.findUnique({
  where:{
    id:stock_id
  }
})
if(!stock){
  throw createError(401,"stock not found");
}
 await tx.trade_request.create({
      data: {
        portfolio_id: portfolio.id,
        stock_id,
        quantity,
        type:"SELL",
        status: "PENDING"
      }
    });

})


res.status(200).json({success:true,message:"trade request sent successfully"})
}catch(err:any){
      logger.error(err);
      next(createError(500,"Internal Server Error"));
    }
}

export const getAll=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const client_id=req.user?.id;

  if(req.user?.roles!==Roles.USER){
    return next(createError(401,"only user can get all transactions"));
  }
  if(!client_id){
    return next(createError(401,"client id is required"));
  }


  try{
      const portfolio=await prisma.portfolio.findFirst({
        where:{ user_id:client_id }
      })
      if(!portfolio){
        throw createError(401,"portfolio not found");
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


      res.status(200).json({
        success: true,
        data: {
          transactions,
          trade_requests,
          investments
        }
      })


  }catch(err:any){
    logger.error(err);
    next(err);
  }
}
