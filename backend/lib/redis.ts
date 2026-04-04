import { Redis } from 'ioredis';
import logger from '../winstonlog/logger.js';

let redis: Redis | null = null;

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

try {
  redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null, // Critical: Allows the retryStrategy to actually run
    connectTimeout: 10000,       // 10 second timeout for initial connection
    commandTimeout: 5000,        // 5 second timeout for individual commands
    enableReadyCheck: false,     // Recommended for Upstash/Serverless to avoid extra overhead
    // Automatic TLS support for rediss:// urls (common in Upstash/Cloud)
    tls: redisUrl.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
    retryStrategy(times: number) {
      const delay = Math.min(times * 100, 3000);
      if (times > 5) {
        logger.warn('Redis reconnection failed after 5 attempts. Falling back to DB.');
        return null; // Stop retrying after 5 failures
      }
      return delay;
    },
  });

  redis.on('error', (err: Error) => {
    // We log it as a warning because we have graceful DB fallback logic in the controllers
    logger.warn(`Redis connection error: ${err.message}. Caching gracefully falling back to origin.`);
  });

  redis.on('connect', () => {
    logger.info('Connected to Redis');
  });
} catch (err: any) {
  logger.warn(`Could not initialize Redis client: ${err.message}`);
}

/**
 * Helper to safely get cached value.
 * Returns null if Redis is offline or if there's a timeout.
 */
export const getCache = async (key: string): Promise<string | null> => {
  if (!redis || redis.status !== 'ready') return null;
  try {
    return await redis.get(key);
  } catch (err) {
    return null;
  }
};

/**
 * Helper to safely set cached value with a TTL.
 */
export const setCache = async (key: string, value: string, ttlSeconds: number = 300): Promise<void> => {
  if (!redis || redis.status !== 'ready') return;
  try {
    await redis.setex(key, ttlSeconds, value);
  } catch (err) {
    // Graceful silent fail
  }
};

export default redis;
