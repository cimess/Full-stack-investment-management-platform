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
