import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        user_id: user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20 // Limit to recent 20 for now
    });

    const unreadCount = await prisma.notification.count({
      where: {
        user_id: user.id,
        read: false
      }
    });

    return res.status(200).json({ success: true, data: { notifications, unreadCount } });
  } catch (err: any) {
    logger.error("Failed to get notifications: ", err);
    return next(createError(500, "Internal Server Error"));
  }
};

export const markNotificationsRead = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return next(createError(401, "Unauthorized"));
  }

  try {
    await prisma.notification.updateMany({
      where: {
        user_id: user.id,
        read: false
      },
      data: {
        read: true
      }
    });

    return res.status(200).json({ success: true, message: "Notifications marked as read" });
  } catch (err: any) {
    logger.error("Failed to mark notifications read: ", err);
    return next(createError(500, "Internal Server Error"));
  }
};
