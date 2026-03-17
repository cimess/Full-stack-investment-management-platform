import { Roles } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import type{ AuthRequest } from "../middlewear/auth.js";


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

        const hashedPassword=await bcrypt.hash(manager_access_key,10);
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



export const addSuperAdmin=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {super_admin_access}=req.body;
    const user_id=req.user?.id;
    await prisma.$transaction(async (tx) => {
      if (!super_admin_access) {
        throw createError(400, "invalid credentials");
      }
      if (!user_id) {
        throw createError(401, "pls login to continue");
      }

      const add_admin = await tx.user.update({
        where: { id: user_id },
        data: { roles: Roles.ADMIN }
      });

      if (!add_admin) {
        throw createError(500, "Internal Server Error");
      }

      const hashesPassword = await bcrypt.hash(super_admin_access, 10);
      await tx.admin.create({
        data: {
          user_id: user_id,
          super_admin_access: hashesPassword,
          super_admin: true
        }
      });
    });

    return res.status(200).json({ success: true, message: "admin access granted successfully" });
  } catch (err: any) {
    logger.error(err);
    return next(err.statusCode ? err : createError(500, "Internal Server Error"));
  }
};

export const generateAccessKey = async (req: Request, res: Response, next: NextFunction) => {
  const { access_key, userid, role } = req.body;
  const admin_id = req.user?.id;

  if (!access_key || !userid || !role) {
    return next(createError(400, "Missing required fields (access_key, userid, role)"));
  }

  try {
    const adminUser = await prisma.admin.findUnique({
      where: { user_id: admin_id! }
    });

    if (!adminUser || !adminUser.super_admin) {
      return next(createError(403, "Forbidden: Super Admin access required"));
    }

    const hashedPassword = await bcrypt.hash(access_key, 10);

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
          approval_code: hashedPassword,
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
          approval_code: hashedPassword,
          superAdmin_id: adminUser.id,
          admin_id: userid
        }
      });
    } else {
      return next(createError(400, "Invalid role for promotion"));
    }

    return res.status(200).json({ success: true, 
      message: `${role} access code generated successfully`, 
      key: access_key });
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

    const user = await prisma.user.findUnique({
      where: { id: userId, roles: Roles.USER, isVerified: true }
    });

    if (!user) {
      return next(createError(401, "User not found or already promoted"));
    }

    const approval = await prisma.approved_Admin.findFirst({
      where: {
        admin_id: userId,
        is_used: false
      }
    });

    if (!approval) {
      return next(createError(401, "No pending admin approval found for this user"));
    }

    const isMatch = await bcrypt.compare(access_key, approval.approval_code);
    if (!isMatch) {
      return next(createError(401, "Invalid admin access key"));
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { roles: Roles.ADMIN }
      }),
      prisma.admin.create({
        data: {
          user_id: userId,
          super_admin: false
        }
      }),
      prisma.approved_Admin.update({
        where: { id: approval.id },
        data: { is_used: true }
      })
    ]);

    return res.status(200).json({ success: true, message: "Admin access granted successfully" });
  } catch (err: any) {
    logger.error(err);
    return next(createError(500, "Internal Server Error"));
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
