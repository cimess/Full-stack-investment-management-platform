import { Redis } from 'ioredis';
import logger from '../winstonlog/logger.js';

let redis: Redis | null = null;

try {
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 1, // Fail fast if Redis is down
    retryStrategy(times: number) {
      if (times > 3) {
        logger.warn('Redis retry stopped (attempted 3 times).');
        return null; // Stop retrying
      }
      return Math.min(times * 100, 3000);
    },
  });

  redis.on('error', (err: Error) => {
    logger.warn(`Redis connection error: ${err.message}. Caching gracefully falling back to origin.`);
  });

  redis.on('connect', () => {
    logger.info('Connected to Redis');
  });
} catch (err: any) {
  logger.warn(`Could not initialize Redis client fallback to standard DB: ${err.message}`);
}

/**
 * Helper to safely get cached value.
 * Fails gracefully and returns null if Redis is offline.
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
 * Helper to safely set cached value.
 * Fails gracefully.
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
