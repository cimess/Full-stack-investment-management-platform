import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";
import createError from "http-errors";
import type { AuthRequest } from "../middlewear/auth.js";
import { Roles } from "../prisma/generated/index.js";

const getManagerAccess=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const role=req.user?.roles;


  if(role!==Roles.MANAGER){
    return next(createError(400,"not authorized"));
  }

  const {email,password,token_access}=result.data;

  try{

const user=await prisma.user.findUnique({
  where:{
    email:email
  }
})

if(!user){
  return next(createError(401,"invalid credentials"));
}
const isPasswordValid=await bcrypt.compare(password,user.password);


if(!isPasswordValid){
return next(createError(401,"invalid credentials"));
}
if(user.roles!==Roles.MANAGER){
  return next(createError(401,"not authorized"));
}
 if(token_refresh){await prisma.refreshToken.delete({
    where:{
      user_id:user.id,
      token:token_refresh
    }
  })
}
const accessToken=generateAccessToken({id:user.id,roles:user.roles})
const refreshToken=generateRefreshToken({id:user.id,roles:user.roles})

res.cookie("refreshToken",refreshToken,{
  httpOnly:true,
  secure:process.env.NODE_ENV==="production",
  sameSite:"strict",
  maxAge:7*24*60*60*1000
})

const saveRefreshToken=await prisma.refreshToken.create({
  data:{
    token:refreshToken,
    user_id:user.id
  }
})
if(!saveRefreshToken){
  return next(createError(500,"Internal Server Error"));
}

const {id,roles,username,fullname}=user
const email_user=user.email
return res.status(200).json({success:true,message:"manager logged in successfully",data:{accessToken,id,roles,fullname,email_user,username}})

  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}
