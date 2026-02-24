import createError from "http-errors";
import {loginSchema,registerSchema,loginManagerSchema} from "../zodschema/registerschemer.js";
import {prisma} from "../lib/prisma.js"
import logger from "../winstonlog/logger.js";
import type{ Request,Response } from "express";
import bcrypt from "bcrypt";
import {generateAccessToken, generateRefreshToken, verifyTokenSecret} from "../middlewear/auth.js";
import type {AuthRequest} from "../middlewear/auth.js";
import type {NextFunction} from "express";
import { Roles } from "../prisma/generated/index.js";
export const registerUser= async(req:Request,res:Response,next:NextFunction)=>{

const result=registerSchema.safeParse(req.body);

if(!result.success){
return next(createError(400,result.error.issues[0]?.message as string));
}
const{username,name,role,password,email}=result.data;

const hashedPassword=await bcrypt.hash(password,10);

try{

  const user=await prisma.user.create({
      data:{
          username:username,
          fullname:name,
          password:hashedPassword,
          email:email,
          roles:role || 'USER'
      }
  })
  logger.info('user created',user)
return res.status(201)
.json({success:true,message:"user created successfully"
})
}catch(err:any){
logger.error(err);
  if (err.code === 'P2002') {
    return next(createError(409,"Email or Username already exists"));
  }
    return next(createError(500,"Internal Server Error"));
}

}

export const loginUser=async(req:Request,res:Response,next:NextFunction)=>{

  const result=loginSchema.safeParse(req.body);
  const token_refresh=req.cookies.refreshToken;

  if(!result.success){
    return next(createError(400,result.error.issues[0]?.message as string));
  }

  const {email,password}=result.data;

  try{
await prisma.$transaction(async(tx)=>{
const user=await tx.user.findUnique({
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
if(user.roles!==Roles.USER && user.roles!==Roles.ADMIN){
  return next(createError(401,"pls use the manager login page"));
}
const checked_token=verifyTokenSecret(token_refresh);
if(checked_token){
  await tx.refreshToken.delete({
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
return res.status(200).json({success:true,message:"user logged in successfully",data:{accessToken,id,roles,fullname,email_user,username}})
})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const refreshToken=async(req:Request,res:Response,next:NextFunction)=>{

  const token=req.cookies.refreshToken;

  if(!token){
    return next(createError(401,"Unauthorized"));
  }

  const decodedToken=verifyTokenSecret(token);
  if(!decodedToken){
    return next(createError(403,"pls login again"));
  }

  const tokenExists = await prisma.refreshToken.findUnique({
  where: {token }
});
if (!tokenExists) {
  return next(createError(403, "This session has been revoked/logged out!"));
}

  const accessToken=generateAccessToken({id:decodedToken.id,roles:decodedToken.roles})

  const refreshToken=generateRefreshToken({id:decodedToken.id,roles:decodedToken.roles})

  await prisma.refreshToken.deleteMany({
    where:{
      user_id:decodedToken.id
    }
  })

res.cookie("refreshToken",refreshToken,{
  httpOnly:true,
  secure:process.env.NODE_ENV==="production",
  sameSite:"strict",
  maxAge:7*24*60*60*1000
})
const saveRefreshToken=await prisma.refreshToken.create({
  data:{
    token:refreshToken,
    user_id:decodedToken.id
  }
})
if(!saveRefreshToken){
  return next(createError(500,"Internal Server Error"));
}

  return res.status(200).json({success:true,message:"token refreshed successfully",data:{accessToken}})

}



export const logoutUser=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  const userId=req.user?.id;
  const token=req.cookies.refreshToken;

  if(!userId || !token){
    res.clearCookie("refreshToken");
    return res.status(200).json({success:true,message:"logged out successfully"});
  }


  const tokenExists = await prisma.refreshToken.delete({
  where: {
        token,
    user_id:userId }
});
if (!tokenExists) {
  return next(createError(403, "This session has been revoked/logged out!"));
}

  res.clearCookie("refreshToken");

  return res.status(200).json({success:true,message:"user logged out successfully"})

}



export const loginManager=async(req:Request,res:Response,next:NextFunction)=>{

  const result=loginManagerSchema.safeParse(req.body);
  const token_refresh=req.cookies.refreshToken;

  if(!result.success){
    return next(createError(400,result.error.issues[0]?.message as string));
  }

  const {email,password,token_access}=result.data;

  try{

const user=await prisma.user.findUnique({
  where:{
    email:email,
    roles:Roles.MANAGER
  }
})
if(!user){
  return next(createError(401,"invalid credentials"));
}
const manager_approval_code=await prisma.approved_Manager.findUnique({
  where:{
    approval_code:token_access,
    manager_id:user.id
  }
})
if(!manager_approval_code){
  return next(createError(401,"invalid approval code"));
}

const isPasswordValid=await bcrypt.compare(password,user.password);


if(!isPasswordValid){
return next(createError(401,"invalid credentials"));
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
return res.status(200).json({success:true,message:"logged in as Manager successfully",data:{accessToken,id,roles,fullname,email_user,username}})

  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}
