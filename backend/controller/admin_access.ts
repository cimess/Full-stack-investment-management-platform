import { Roles } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { prisma } from "../lib/prisma.js";
import argon2 from "argon2";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken, generateRefreshToken } from "../middlewear/auth.js";


export const managerAccessKey=async(req:Request,res:Response,next:NextFunction)=>{

    const {manager_access_key,slot,userid}=req.body;
    const user_id=req.user?.id;
      if(!manager_access_key||!slot||!userid){
        return next(createError(400,"invalid credentials"));
      }
      if(!user_id){
        return next(createError(401,"pls login to continue"));
      }
      try{

        const hashedPassword=await argon2.hash(manager_access_key);
        const number_slot=parseInt(slot);
    const user=await prisma.admin.findUnique({
      where:{
       user_id
      }
    })
    if(!user){
      return next(createError(401,"invalid credentials"));
    }
    if(!user?.super_admin){
    
      return next(createError(401,"Forbidden "));
    }
    await prisma.$transaction(async(tx)=>{
      if(user_id){

    const approved_access=await tx.approved_Manager.create({
      data:{
        approval_code:hashedPassword,
        manager_slot:number_slot,
        admin_id:user.id,
        user_id:userid
      }
    })
    if(!approved_access){
      return next(createError(500,"Internal Server Error"));
    }


  }
  }, {
    timeout: 30000
  })
    return res.status(200).json({success:true,message:"manager access granted successfully",key:hashedPassword})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}



export const getAdminDashboard=async(req:Request,res:Response,next:NextFunction)=>{


  try {
    const results = await Promise.allSettled([
      prisma.user.findMany({
        where: { roles: Roles.USER },
        select: { id: true, fullname: true, email: true, manager_id: true, restricted: true, createdAt: true, updatedAt: true }
      }),
      prisma.user.findMany({
        where: { roles: Roles.MANAGER },
        select: { id: true, fullname: true, email: true, restricted: true, createdAt: true, updatedAt: true }
      }),
      prisma.user.findMany({
        where: { roles: Roles.USER, restricted: true },
        select: { id: true, fullname: true, email: true, manager_id: true, restricted: true, createdAt: true, updatedAt: true }
      }),
      prisma.user.findMany({
        where: { roles: Roles.MANAGER, restricted: true },
        select: { id: true, fullname: true, email: true, restricted: true, createdAt: true, updatedAt: true }
      }),
      prisma.transaction.findMany({
        take: 30,
        orderBy: { createdAt: "desc" }
      }),
      prisma.trade_request.findMany({
        take: 30,
        orderBy: { createdAt: "desc" }
      }),
      prisma.portfolio.findMany({
        take: 30,
        orderBy: { user_id: "desc" }
      }),
      prisma.stockTable.findMany({
        take: 30,
        orderBy: { createdAt: "desc" }
      }),
      prisma.admin.findMany({
        select: { id: true, user_id: true, super_admin: true, createdAt: true, updatedAt: true }
      }),
      prisma.approved_Manager.findMany({
        select: { id: true, approval_code: true, manager_slot: true, admin_id: true, user_id: true, createdAt: true, updatedAt: true }
      })
    ]);

    const data: any = {};
    const keys = [
      "users", "managers", "restrictedUser", "restrictedManagers", "transactions",
      "tradeRequests", "portfolios", "stocks", "admin", "approvedManagers"
    ];

    results.forEach((result, index) => {
      const key = keys[index];
      if(!key)return  logger.error(`Error fetching ${key} for admin dashboard:`);
      if (result.status === "fulfilled") {
        data[key] = result.value;
      } else {
        logger.error(`Error fetching ${key} for admin dashboard:`, result.reason);
        data[key] = []; // Fallback to empty array on failure
      }
    });

    return res.status(200).json({
      success: true,
      message: "Admin dashboard data fetched",
      data
    });
  } catch (err: any) {
    logger.error("Unexpected error in getAdminDashboard:", err);
    return next(createError(500, "Internal Server Error"));
  }


}



export const addSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { super_admin_access } = req.body;
    const user_id = req.user?.id;

    if (!super_admin_access) {
      return next(createError(400, "invalid credentials"));
    }
    if (!user_id) {
      return next(createError(401, "pls login to continue"));
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Clear existing tokens
      await tx.refreshToken.deleteMany({
        where: { user_id: user_id }
      });

      // 2. Update user to ADMIN
      const updatedUser = await tx.user.update({
        where: { id: user_id },
        data: { roles: Roles.ADMIN }
      });

      const admin = await tx.admin.findFirst({
        where: { super_admin: true }
      });
      if(admin){
        throw (createError(400, "Super Admin already exists pls who are you ??"));
      }
      // 3. Create Admin profile
      const hashedPassword = await argon2.hash(super_admin_access);
      await tx.admin.create({
        data: {
          user_id: user_id,
          super_admin_access: hashedPassword,
          super_admin: true
        }
      });

      // 4. Generate NEW tokens with ADMIN role
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

    // 5. Send tokens in cookies
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
      message: "Admin access granted successfully. Session updated." 
    });
  } catch (err: any) {
    logger.error(err);
    return next(err.statusCode ? err : createError(500, "Internal Server Error"));
  }
};

export const generateAccessKey = async (req: Request, res: Response, next: NextFunction) => {
  const { userid, role } = req.body;
  const admin_id = req.user?.id;

  if (!userid || !role) {
    return next(createError(400, "Missing required fields (userid, role)"));
  }

  try {
    const adminUser = await prisma.admin.findUnique({
      where: { user_id: admin_id! }
    });

    if (!adminUser || !adminUser.super_admin) {
      return next(createError(403, "Forbidden: Super Admin access required"));
    }

const accessKey = crypto.randomUUID(); 

    if (role === 'MANAGER') {
      const isAccessCodeGenerated=await prisma.approved_Manager.findUnique({
        where:{user_id:userid,
          is_used:false
        }
      })
      if(isAccessCodeGenerated){
        return res.status(409).json({ success: false, message: "Access code already generated",key:isAccessCodeGenerated.approval_code });
      }
      await prisma.approved_Manager.create({
        data: {
          approval_code: accessKey,
          admin_id: adminUser.id,
          user_id: userid,
          manager_slot: 1 // Default slots
        }
      });
    } else if (role === 'ADMIN') {
      const isAccessCodeGenerated=await prisma.approved_Admin.findUnique({
        where:{admin_id:userid,
          is_used:false
        }
      })
      if(isAccessCodeGenerated){
        return res.status(409).json({ success: false, message: "Access code already generated",key:isAccessCodeGenerated.approval_code });
      }
      await prisma.approved_Admin.create({
        data: {
          approval_code: accessKey,
          superAdmin_id: adminUser.id,
          admin_id: userid
        }
      });
    } else {
      return next(createError(400, "Invalid role for promotion"));
    }

    return res.status(200).json({ success: true, 
      message: `${role} access code generated successfully`, 
      key: accessKey });
  } catch (err: any) {
    logger.error(err);
    return next(createError(500, "Internal Server Error"));
  }
};

export const addAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { access_key } = req.body;

    if (!userId || !access_key) {
      return next(createError(401, "Authentication and access key required"));
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Verify eligibility
      const user = await tx.user.findUnique({
        where: { id: userId, roles: Roles.USER, isVerified: true }
      });

      if (!user) {
        throw createError(401, "User not found or already promoted");
      }

      // 2. Verify approval
      const approval = await tx.approved_Admin.findFirst({
        where: {
          admin_id: userId,
          is_used: false
        }
      });

      if (!approval) {
        throw createError(401, "No pending admin approval found for this user");
      }

      let isMatch = false;
      if (approval.approval_code.startsWith("$2")) {
        isMatch = await bcrypt.compare(access_key, approval.approval_code);
      } else {
        isMatch = await argon2.verify(approval.approval_code, access_key);
      }
      if (!isMatch) {
        throw createError(401, "Invalid admin access key");
      }

      // 3. Clear existing tokens
      await tx.refreshToken.deleteMany({
        where: { user_id: userId }
      });

      // 4. Perform promotion
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { roles: Roles.ADMIN }
      });

      await tx.admin.create({
        data: {
          user_id: userId,
          super_admin: false
        }
      });

      await tx.approved_Admin.update({
        where: { id: approval.id },
        data: { is_used: true }
      });

      // 5. Generate NEW tokens with ADMIN role
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

    // 6. Set cookies
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
      message: "Admin access granted successfully. Session updated." 
    });
  } catch (err: any) {
    logger.error(err);
    return next(err.statusCode ? err : createError(500, "Internal Server Error"));
  }
};

export const restrictUser=async(req:Request,res:Response,next:NextFunction)=>{

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
    if(user?.roles===Roles.ADMIN||!super_admin_access){
      return next(createError(401,"invalid super admin access"));
    }

    const restrict = await prisma.user.update({
      where: { id: user_id },
      data: { restricted: !user.restricted }
    });
    if (!restrict) {
      return next(createError(500, "Internal Server Error"));
    }
    return res.status(200).json({ success: true, message: `User ${restrict.restricted ? 'restricted' : 'unrestricted'} successfully` });
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const restrictManager=async(req:Request,res:Response,next:NextFunction)=>{

  try{
    const {user_id,super_admin_access}=req.body;

    const user=await prisma.manager.findUnique({
      where:{
        id:user_id,
        user:{
          roles:Roles.MANAGER
        }
      },
      include:{
        user:true
      }
    })
    if(!user||!super_admin_access){
      return next(createError(401,"invalid credentail or access"));
    }

    const restrict = await prisma.user.update({
      where: { id: user_id },
      data: { restricted: !user.user.restricted }
    });
    if (!restrict) {
      return next(createError(500, "Internal Server Error"));
    }
    return res.status(200).json({ success: true, message: `Manager ${restrict.restricted ? 'restricted' : 'unrestricted'} successfully` });
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

export const remoteShutdown = async (req: Request, res: Response,next:NextFunction) => {
  logger.warn(`Remote shutdown initiated by Admin: ${req.user?.id}`);

  const {super_admin_access}=req.body;

  try{
    if(!super_admin_access||!req.user?.id){
    return next(createError(401,"invalid super admin access"));
  }

  const super_admin=await prisma.admin.findFirst({
    where:{
      user_id:req.user?.id,
      super_admin:true
    },
    select:{
      super_admin:true,
      super_admin_access:true
    }
  })

  if(!super_admin){
    return next(createError(401,"invalid super admin access"));
  }

}catch(err:any){
  logger.error(err);
  return next(createError(500,"Internal Server Error"));
}
  res.status(200).json({ 
    success: true, 
    message: "Initiating emergency shutdown... Goodbye." 
  });

  // Small delay to allow the response to reach the client
  setTimeout(() => {
    process.kill(process.pid, 'SIGTERM');
  }, 1000);
};
