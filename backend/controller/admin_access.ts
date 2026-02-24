import { Roles } from "../prisma/generated/index.js";
import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getAllUser=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const users=await prisma.user.findMany({
      where:{
        roles:Roles.USER
      }
    })
    return res.status(200).json({success:true,message:"users fetched successfully",data:users})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const getAllManager=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const users=await prisma.user.findMany({
      where:{
        roles:Roles.MANAGER
      }
    })
    return res.status(200).json({success:true,message:"managers fetched successfully",data:users})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const getAllAdmin=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const users=await prisma.user.findMany({
      where:{
        roles:Roles.ADMIN
      }
    })
    return res.status(200).json({success:true,message:"admins fetched successfully",data:users})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const getAllRistrictedUser=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const users=await prisma.user.findMany({
      where:{
        roles:Roles.USER,
        restricted:true
      }
    })
    return res.status(200).json({success:true,message:"banned users fetched successfully",data:users})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const getAllRistrictedManager=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const users=await prisma.user.findMany({
      where:{
        roles:Roles.MANAGER,
        restricted:true
      }
    })
    return res.status(200).json({success:true,message:"restricted managers fetched successfully",data:users})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const addAdmin=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const {user_id,super_admin_access}=req.body;
    const user=await prisma.user.findUnique({
      where:{
        id:user_id
      }
    })
    if(!user){
      return next(createError(401,"invalid credentials"));
    }
    if(user?.roles===Roles.ADMIN){
      return next(createError(401,"already an admin"));
    }
    await prisma.$transaction(async(tx)=>{
    const add_admin=await tx.user.update({
      where:{
        id:user_id
      },
      data:{
        roles:Roles.ADMIN
      }
    })
    if(!add_admin){
      return next(createError(500,"Internal Server Error"));
    }
    const hashesPassword=await bcrypt.hash(super_admin_access,10);
    if(add_admin){
      await tx.admin.create({
        data:{
          admin_id:user_id,
          super_admin_access:hashesPassword,
          super_admin:true
        }
      })
    }
  })
    return res.status(200).json({success:true,message:"admin access granted successfully"})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}
