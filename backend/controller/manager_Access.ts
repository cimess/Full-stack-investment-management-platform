import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";
import createError from "http-errors";
import { Roles } from "../prisma/generated/index.js";

export const getManagerAccess=async(req:Request,res:Response,next:NextFunction)=>{

  const {approval_code,userId}=req.body;

  if(!approval_code){
    return next(createError(401,"approval code is required"));
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
  return next(createError(401,"invalid credentials"));
}
if(user?.restricted){
  return next(createError(401,"user is currently restricted"));
}
const manager_approval_code=await prisma.approved_Manager.findUnique({
  where:{
    approval_code:approval_code,
    is_used:false,
    manager_slot:{
      gt:0
    }
  }
})
if(!manager_approval_code){
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
    approval_code:approval_code,
    manager_slot:manager_approval_code.manager_slot
  }
})
if(!add_manager){
  return next(createError(500,"Internal Server Error"));
}
const update_approval_code=await prisma.approved_Manager.update({
  where:{
    approval_code:approval_code
  },
  data:{
    is_used:true
  }
})
if(!update_approval_code){
  return next(createError(500,"Internal Server Error"));
}

res.status(200).json({success:true,message:"manager access granted successfully"})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}
