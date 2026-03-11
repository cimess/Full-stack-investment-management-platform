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


  try{
   const [users,managers,restrictedUser,restrictedManagers,transactions,tradeRequests,portfolios,stocks,admin,approvedManagers]=await Promise.all([
    prisma.user.findMany({
      where:{
        roles:Roles.USER
      },
      select:{id:true,fullname:true,email:true,manager_id:true,createdAt:true,updatedAt:true}
    }),
    prisma.user.findMany({
      where:{
        roles:Roles.MANAGER
      },
      select:{id:true,fullname:true,email:true,createdAt:true,updatedAt:true}
    }),
    prisma.user.findMany({
      where:{
        roles:Roles.USER,
        restricted:true
      },
      select:{id:true,fullname:true,email:true,manager_id:true,createdAt:true,updatedAt:true}
    }),
    prisma.user.findMany({
      where:{
        roles:Roles.MANAGER,
        restricted:true
      },
      select:{id:true,fullname:true,email:true,createdAt:true,updatedAt:true}
    }),
    prisma.transaction.findMany({
      take:30,
      orderBy:{createdAt:"desc"}
    }),
    prisma.trade_request.findMany({
      take:30,
      orderBy:{createdAt:"desc"}
    }),
    prisma.portfolio.findMany({
      take:30,
      orderBy:{user_id:"desc"}
    }),
    prisma.stockTable.findMany({
      take:30,
      orderBy:{createdAt:"desc"}
    }),
    prisma.admin.findMany({
      select:{id:true,user_id:true,super_admin:true,createdAt:true,updatedAt:true}
    }),
    prisma.approved_Manager.findMany({
      select:{id:true,approval_code:true,manager_slot:true,admin_id:true,user_id:true,createdAt:true,updatedAt:true}
    })
   ])
   return res.status(200).json({success:true,message:"users fetched successfully",data:{users,managers,restrictedUser,restrictedManagers,transactions,tradeRequests,portfolios,stocks,admin,approvedManagers}})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
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

export const addAdmin=async(req:Request,res:Response,next:NextFunction)=>{

  try{

    if (!req.user) {
  return next(createError(401, "User not authenticated"));
}
const {access_key}=req.body;
    const {id,roles}=req.user;

    if(roles===Roles.ADMIN){
      return next(createError(401,"already have admin access"));
    }
    await prisma.$transaction(async(tx)=>{
      if(id&&access_key){

        const accesscode=await tx.approved_Admin.findFirst({
          where:{
            approval_code:access_key,
            is_used:false
          }
        })
        if(!accesscode){
          return next(createError(401,"invalid admin access key"));
        }

       const super_admin=await tx.admin.findFirst({
        where:{
          user_id:id,
          super_admin:true
        }
       })
       if(!super_admin){
        return next(createError(401,"invalid super admin access"));
       }
    const add_admin=await tx.user.update({
      where:{
        id:id
      },
      data:{
        roles:Roles.ADMIN,

      }
    })
    if(!add_admin){
      return next(createError(500,"Internal Server Error"));
    }

    if(add_admin){
      await tx.admin.create({
        data:{
          user_id:id,
          super_admin:false
        }
      })
    }
  }
  })
    return res.status(200).json({success:true,message:"admin access granted successfully"})
  }catch(err:any){
    logger.error(err);
    return next(createError(500,"Internal Server Error"));
  }
}

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

    const restrict=await prisma.user.update({
      where:{
        id:user_id
      },
      data:{
        restricted:true
      }
    })
    if(!restrict){
      return next(createError(500,"Internal Server Error"));
    }
    return res.status(200).json({success:true,message:"user restricted successfully"})
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

    const restrict=await prisma.user.update({
      where:{
        id:user_id
      },
      data:{
        restricted:true
      }
    })
    if(!restrict){
      return next(createError(500,"Internal Server Error"));
    }
    return res.status(200).json({success:true,message:"manager restricted successfully"})
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
