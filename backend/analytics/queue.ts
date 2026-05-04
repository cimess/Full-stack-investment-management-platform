import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";

// Event types
type PageVisitEvent = { type: 'PAGE_VISIT'; data: any };
type FeatureEvent = { type: 'FEATURE_EVENT'; data: any };
type AnalyticsEvent = PageVisitEvent | FeatureEvent;

const eventBuffer: AnalyticsEvent[] = [];
const MAX_BUFFER = 100; // Flush early if we get a sudden spike
const FLUSH_INTERVAL_MS = 10000; // 10 seconds

export const pushAnalyticsEvent = (event: AnalyticsEvent) => {
  eventBuffer.push(event);
  if (eventBuffer.length >= MAX_BUFFER) {
    flushAnalytics(); // Async fire and forget
  }
};

export const flushAnalytics = async () => {
  if (eventBuffer.length === 0) return;

  // Copy and clear buffer instantly so subsequent requests aren't blocked
  const eventsToProcess = [...eventBuffer];
  eventBuffer.length = 0; 

  const pageVisits = eventsToProcess.filter(e => e.type === 'PAGE_VISIT').map(e => e.data);
  const featureEvents = eventsToProcess.filter(e => e.type === 'FEATURE_EVENT').map(e => e.data);

  try {
    // Bulk inserts are much better for the DB than individual inserts
    if (pageVisits.length > 0) {
      await prisma.pageVisit.createMany({ data: pageVisits, skipDuplicates: true });
    }
    if (featureEvents.length > 0) {
      await prisma.featureEvent.createMany({ data: featureEvents, skipDuplicates: true });
    }
  } catch (error) {
    logger.error("Failed to flush analytics queue", { error });
  }
};

// Start the continuous background flush
setInterval(() => {
  flushAnalytics().catch(err => logger.error("Interval flush error", { err }));
}, FLUSH_INTERVAL_MS);
