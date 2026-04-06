import { prisma } from "../lib/prisma.js";
import { getCache, setCache } from "../lib/redis.js";
import logger from "../winstonlog/logger.js";

/**
 * Background worker to cache all market data globally.
 * This avoids hitting the database for popular stock ticks.
 */
export async function updateGlobalMarketCache() {
  const CACHE_KEY = "global:market:quotes:all";
  
  try {
    const stocks = await prisma.stockTable.findMany({
      orderBy: { symbol: 'asc' },
    });

    if (stocks.length === 0) {
      logger.warn("[Worker] No stocks found in DB to cache.");
      return;
    }

    // Format BigInt to String for JSON serialization
    const formattedData = stocks.map(stock => ({
      ...stock,
      marketCap: stock.marketCap ? stock.marketCap.toString() : null,
      price: Number(stock.price)
    }));

    // Cache the entire list for 1200 seconds (overwritten by the loop every 10 minutes)
    await setCache(CACHE_KEY, JSON.stringify(formattedData), 1200);
    logger.info(`[Worker] Cached ${formattedData.length} stocks to Redis.`);
  } catch (error) {
    logger.error("[Worker] Failed to update global market cache:", error);
  }
}

/**
 * Start the background worker loop
 * @param intervalMs How often to refresh (default 10 minutes)
 */
export function startMarketCacheWorker(intervalMs = 600000) {
  logger.info(`[Worker] Initializing Market Cache Worker (Interval: ${intervalMs}ms)`);
  
  // Run immediately once
  updateGlobalMarketCache();

  // Then start the interval
  setInterval(updateGlobalMarketCache, intervalMs);
}
