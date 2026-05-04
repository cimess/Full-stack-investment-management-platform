import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { pushAnalyticsEvent } from "../analytics/queue.js";
import logger from "../winstonlog/logger.js";

export const trackFrontendEvent = (req: Request, res: Response) => {
  try {
    const { eventName, metadata, sessionId, type = 'FEATURE_EVENT' } = req.body;
    
    if (!req.user?.id) return res.status(401).json({ success: false });

    // Validate consent (optional, assuming handled on frontend before calling)
    pushAnalyticsEvent({
      type: type as 'FEATURE_EVENT' | 'PAGE_VISIT',
      data: type === 'FEATURE_EVENT' ? {
        userId: req.user.id,
        sessionId: sessionId || 'frontend-session',
        eventName,
        eventMetadata: metadata || {},
        createdAt: new Date()
      } : {
        userId: req.user.id,
        sessionId: sessionId || 'frontend-session',
        pageRoute: eventName, // using eventName as route for page visits
        enteredAt: new Date()
      }
    });

    res.status(200).json({ success: true });
  } catch (error) {
    logger.error("Error pushing frontend event", { error });
    res.status(500).json({ success: false });
  }
};

// POST /analytics/feedback
export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { triggerContext, questionAsked, userResponse, score } = req.body;
    
    if (!req.user?.id) return res.status(401).json({ success: false });

    // We write feedback directly (not queued) because it's valuable and low volume
    await prisma.userFeedback.create({
      data: {
        userId: req.user.id,
        triggerContext,
        questionAsked,
        userResponse,
        score
      }
    });

    res.status(200).json({ success: true, message: "Feedback saved" });
  } catch (error) {
    logger.error("Error saving feedback", { error });
    res.status(500).json({ success: false });
  }
};

// --- ADMIN DASHBOARD ROUTES ---

// GET /admin/analytics/overview
export const getAnalyticsOverview = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    
    // Example: Daily Active Users (DAU) - users with an event in last 24h
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Use raw query for distinct users for efficiency
    const dauResult = await prisma.$queryRaw`
      SELECT COUNT(DISTINCT "userId") as count 
      FROM "FeatureEvent" 
      WHERE "createdAt" >= ${yesterday}
    `;
    
    const dau = Number((dauResult as any[])[0]?.count || 0);

    // Top features
    const topFeatures = await prisma.featureEvent.groupBy({
      by: ['eventName'],
      _count: { eventName: true },
      orderBy: { _count: { eventName: 'desc' } },
      take: 5
    });

    res.status(200).json({
      success: true,
      data: { totalUsers, dau, topFeatures }
    });
  } catch (error) {
    logger.error("Analytics overview fetch failed", { error });
    res.status(500).json({ success: false });
  }
};
