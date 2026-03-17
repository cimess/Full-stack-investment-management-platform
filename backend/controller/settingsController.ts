import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";

export const updateUserSettings = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return next(createError(401, "Unauthorized"));
  }

  const { tradeNotifications, emailNotifications, theme } = req.body;

  try {
    const updatedSettings = await prisma.userSettings.upsert({
      where: {
        user_id: user.id
      },
      update: {
        ...(tradeNotifications !== undefined && { tradeNotifications }),
        ...(emailNotifications !== undefined && { emailNotifications }),
        ...(theme !== undefined && { theme })
      },
      create: {
        user_id: user.id,
        tradeNotifications: tradeNotifications ?? true,
        emailNotifications: emailNotifications ?? true,
        theme: theme ?? "system"
      }
    });

    return res.status(200).json({ success: true, message: "Settings updated successfully", data: updatedSettings });
  } catch (err: any) {
    logger.error("Failed to update user settings: ", err);
    return next(createError(500, "Internal Server Error"));
  }
};
