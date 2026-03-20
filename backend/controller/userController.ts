import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import bcrypt from "bcryptjs";
import { updateSchema } from "../zodschema/registerschemer.js";

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

  const { name: fullname, username, email, password } = result.data;

  try {
    // Dynamically build the update object (JSON style patching)
    const updateData: any = {};
    if (fullname !== undefined) updateData.fullname = fullname;
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
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
