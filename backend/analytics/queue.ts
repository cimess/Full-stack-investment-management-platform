import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";

// Event types
type PageVisitEvent = { type: 'PAGE_VISIT'; data: any };
type FeatureEvent = { type: 'FEATURE_EVENT'; data: any };
type AnalyticsEvent = PageVisitEvent | FeatureEvent;

const eventBuffer: AnalyticsEvent[] = [];
const MAX_BUFFER = 100; // Flush early if we get a sudden spike
const FLUSH_INTERVAL_MS = 10000; // 10 seconds
let isProcessing = false;

export const pushAnalyticsEvent = (event: AnalyticsEvent) => {
  eventBuffer.push(event);
  if (eventBuffer.length >= MAX_BUFFER) {
    flushAnalytics(); // Async fire and forget
  }
};

export const flushAnalytics = async () => {
  if (eventBuffer.length === 0) return;

  isProcessing = true;

  // Copy and clear buffer instantly so subsequent requests aren't blocked
  const eventsToProcess = [...eventBuffer];
  eventBuffer.length = 0; 

  const pageVisits = eventsToProcess.filter(e => e.type === 'PAGE_VISIT').map(e => e.data);
  const featureEvents = eventsToProcess.filter(e => e.type === 'FEATURE_EVENT').map(e => e.data);

  try {

       const uniqueSessions = new Map();
    eventsToProcess.forEach(event => {
      if (!uniqueSessions.has(event.data.sessionId)) {
        uniqueSessions.set(event.data.sessionId, {
          id: event.data.sessionId,
          sessionToken: event.data.sessionId,
          userId: event.data.userId || null,
          // We can optionally add IP or device info here if passed from the controller!
        });
      }
    });

     if (uniqueSessions.size > 0) {
      await prisma.userSession.createMany({
        data: Array.from(uniqueSessions.values()),
        skipDuplicates: true
      });
    }

    // Bulk inserts are much better for the DB than individual inserts
    if (pageVisits.length > 0) {
      await prisma.pageVisit.createMany({ data: pageVisits, skipDuplicates: true });
    }
    if (featureEvents.length > 0) {
      logger.info("am correntling tracking featured in backend")
      await prisma.featureEvent.createMany({ data: featureEvents, skipDuplicates: true });
    }
  } catch (error) {
    logger.error("Failed to flush analytics queue", { error });
  }finally{
    isProcessing = false;
  }
};

// Start the continuous background flush
setInterval(() => {
  flushAnalytics().catch(err => logger.error("Interval flush error", { err }));
}, FLUSH_INTERVAL_MS);
