import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";
import createError from "http-errors";
import { Roles } from "@prisma/client";
import type { AuthRequest } from "../middlewear/auth.js";

export const getManagerAccess=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const {access_key}=req.body;
  const userId=req.user?.id;
  if(!access_key){
    return next(createError(401,"approval code is required"));
  }
  if(!userId){
    return next(createError(401,"unauthorized"));
  }

  try{

const user=await prisma.user.findUnique({
  where:{
    id:userId,
    roles:Roles.USER
  }
})
if(user?.roles===Roles.MANAGER){
  return next(createError(401,"already a manager pls login with approval code"));
}
if(!user){
  return next(createError(401,"unauthorized"));
}
if(user?.restricted){
  return next(createError(401,"user is currently restricted"));
}
const manager_accessKey=await prisma.approved_Manager.findUnique({
  where:{
    approval_code:access_key,
    is_used:false,
    user_id:userId,
    manager_slot:{
      gt:0
    }
  }
})
if(!manager_accessKey){
  return next(createError(401,"invalid approval code"));
}

const manager=await prisma.user.update({
  where:{
    id:userId
  },
  data:{
    roles:Roles.MANAGER
  }
})
if(!manager){
  return next(createError(500,"Internal Server Error"));
}
const add_manager=await prisma.manager.create({
  data:{
    manager_id:userId,
    approval_code:access_key,
    manager_slot:manager_accessKey.manager_slot
  }
})
if(!add_manager){
  return next(createError(500,"Internal Server Error"));
}
const update_accessKey=await prisma.approved_Manager.update({
  where:{
    approval_code:access_key
  },
  data:{
    is_used:true
  }
})
if(!update_accessKey){
  return next(createError(500,"Internal Server Error"));
}

res.status(200).json({success:true,message:"manager access granted successfully"})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const handleRequest=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const {requestId,status,response,price}=req.body;
  const managerId=req.user?.id;
if (!managerId){
  return next(createError(401,"unauthorized"));
}

  if(!requestId||status||response||price){
    return next(createError(401,"provide all required credentials(requestId,status,response,price)"));
  }

  try{

await prisma.$transaction(async(tx)=>{
const request=await tx.trade_request.findUnique({
  where:{
    id:requestId,
    status:"PENDING"
  },include:{
    portfolio:true
  }
})
if(!request){
  return next(createError(401,"invalid request id"));
}
const client=await tx.user.findUnique({
  where:{id:request.portfolio.user_id}
})
if(client?.manager_id!==managerId){
  throw createError(401,"unauthorized to manage this client");
}

const existing_investment=await tx.investment.findUnique({
  where:{
   portfolio_id_stock_id:{
    portfolio_id:request.portfolio_id,
    stock_id:request.stock_id
   }
  }
})

if(request.type==='BUY'){
if(existing_investment){
              const oldQty = existing_investment.quantity;
            const newQty = request.quantity;
            const oldAvgPrice = Number(existing_investment.avgPrice);
            const newPrice = Number(price);

            const newAvgPrice = (oldQty * oldAvgPrice + newQty * newPrice) / (oldQty + newQty);

            await tx.investment.update({
              where:{
                id:existing_investment.id
              },
              data:{
                quantity:oldQty+newQty,
                avgPrice:newAvgPrice
              }
            })
}else{
  await tx.investment.create({
    data:{
      portfolio_id:request.portfolio_id,
      stock_id:request.stock_id,
      quantity:request.quantity,
      avgPrice:price
    }
  })
}
}else if(request.type==='SELL'){

  if(!existing_investment|| existing_investment.quantity<request.quantity){
    throw createError(400,"insufficient stock quantity to sell");
  }

const remaining_stock=existing_investment.quantity-request.quantity;

if(remaining_stock<=0){
  await tx.investment.delete({
    where:{
      id:existing_investment.id
    }
  })
}else{
  await tx.investment.update({
    where:{
      id:existing_investment.id
    },
    data:{
      quantity:remaining_stock
    }
  })
}

}

await tx.transaction.create({
  data:{
    portfolio_id:request.portfolio_id,
    stock_id:request.stock_id,
    quantity:request.quantity,
    price:price,
    type:request.type
  }
})

const update_request=await tx.trade_request.update({
  where:{
    id:requestId
  },
  data:{
    status:status,
    response:response
  }
})
if(!update_request){
  throw createError(500,"Internal Server Error");
}

})

res.status(200).json({success:true,message:"request handled successfully"})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const managerId = req.user?.id;

  if (!managerId) {
    return next(createError(401, "unauthorized"));
  }

  try {
    // Fetch all users (clients) managed by this specific manager
    const clients = await prisma.user.findMany({
      where: {
        manager_id: managerId, // <-- CRITICAL SECURITY CHECK: Only my clients
        roles: Roles.USER
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        // Include their portfolio and nest the investments & history inside it
        portfolio: {
          select: {
            id: true,
            investment: {
              select: {
                quantity: true,
                avgPrice: true,
                stock: { select: { symbol: true, company: true, price: true } }
              }
            },
            trade_request: {
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
                type: true,
                status: true,
                quantity: true,
                createdAt: true,
                stock: { select: { symbol: true } }
              }
            },
            transaction: {
              orderBy: { createdAt: 'desc' },
              select: {
                type: true,
                quantity: true,
                price: true,
                createdAt: true,
                stock: { select: { symbol: true } }
              }
            }
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: clients
    });
  } catch (err: any) {
    logger.error(err);
    return next(createError(500, "Internal Server Error"));
  }
};

