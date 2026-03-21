import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import bcrypt from "bcryptjs";
import { updateSchema } from "../zodschema/registerschemer.js";
import { generateAccessToken, generateRefreshToken } from "../middlewear/auth.js";
import crypto from "crypto";


export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    return next(createError(401, "Unauthorized"));
  }

  // Validate the request body
  const result = updateSchema.partial().safeParse(req.body);
  if (!result.success) {
    return next(createError(400, result.error.issues[0]?.message as string));
  }

  const { name: fullname, username, email, password,role } = result.data;
  

  try {
    // Dynamically build the update object (JSON style patching)
    const updateData: any = {};
    if (fullname !== undefined) updateData.fullname = fullname;
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) role==="CLIENT"?updateData.roles = "USER":updateData.roles = "MANAGER";
    if (password !== undefined) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({ success: true, message: "No changes provided" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        roles: true,
        isVerified: true,
        updatedAt: true
      }
    });

    if(role==="MANAGER"){
       const token = req.cookies.refreshToken;
       if (!token) {
        return next(createError(401, "Unauthorized"));
       }
         await prisma.refreshToken.deleteMany({
    where: {
      user_id: userId
    }
  })
      // generate approval code
      const approval_code=crypto.randomUUID();

          const result=await prisma.$transaction(async(tx)=>{
           
            await tx.manager.create({
              data:{
                manager_id:userId,
                approval_code:approval_code,
              }
            })
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
        }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (err: any) {
    logger.error("Failed to update user profile: ", err);
    if (err.code === 'P2002') {
      const target = err.meta?.target || [];
      if (target.includes('email')) {
        return next(createError(409, "Email already exists"));
      }
      if (target.includes('username')) {
        return next(createError(409, "Username already exists"));
      }
    }
    return next(createError(500, "Internal Server Error"));
  }
};


/**
 * Safely deactivates a user account (Soft Delete)
 */
export const deactivateAccount = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Get user details to check for assigned manager
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) throw createError(404, "User not found");
      if (user.disabled) throw createError(400, "Account is already deactivated");

      // 2. If user has a manager, free up the manager's slot
      if (user.manager_id) {
        await tx.manager.update({
          where: { id: user.manager_id },
          data: {
            manager_slot: { increment: 1 }
          }
        });
      }

      // 3. Mark user as disabled and disconnect from manager
      await tx.user.update({
        where: { id: userId },
        data: {
          disabled: true,
          manager_id: null
        }
      });

      // 4. Invalidate all active sessions for this user
      await tx.refreshToken.deleteMany({
        where: { user_id: userId }
      });
    });

    // 5. Clear authentication cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Account deactivated successfully. You have been logged out."
    });
  } catch (err: any) {
    logger.error("Failed to deactivate account: ", err);
    return next(createError(500, "Internal Server Error"));
  }
};

