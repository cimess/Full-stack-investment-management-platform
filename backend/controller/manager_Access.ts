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
        where: { id: userId, roles: Roles.USER, isVerified: true }
      });

      if (!user) {
        throw createError(401, "User not eligible for promotion or already promoted");
      }
      if (user.restricted) {
        throw createError(401, "User is currently restricted");
      }

      // 2. Verify approval code
      const manager_accessKey = await tx.approved_Manager.findUnique({
        where: {
          user_id: userId,
          is_used: false,
          approval_code: access_key
        }
      });

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
    portfolio:true,
    stock: true
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

if (client && update_request) {
  await tx.notification.create({
    data: {
      user_id: client.id,
      title: "Trade Request Update",
      message: `Your trade request to ${request.type} ${request.quantity} shares of ${request.stock.symbol} was ${status.toLowerCase()}.`,
      type: "TRADE"
    }
  });
}

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

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
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
        restricted: true,
        createdAt: true,
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
