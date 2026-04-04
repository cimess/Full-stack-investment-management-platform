import { Redis } from 'ioredis';
import logger from '../winstonlog/logger.js';

let redis: Redis | null = null;

const redisUrl = process.env.REDIS_URL;

if (redisUrl) {
  try {
    // ── THE CLOUD-HARDENED TCP CONFIG ──
    // Specifically tuned for Render.com to Upstash.io path
    redis = new Redis(redisUrl, {
      family: 4,                   // FORCE IPv4 (Solves many cloud-to-cloud handshake issues)
      tls: {
        rejectUnauthorized: false, // Bypass strict cert checks that can fail in internal proxies
      },
      connectTimeout: 30000,       // 30 seconds (be extremely patient)
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      keepAlive: 10000,
      noDelay: true,               // Disable Nagle's algorithm for faster small-packet caching
      retryStrategy(times) {
        return Math.min(times * 500, 10000);
      }
    });

    redis.on('error', (err: any) => {
      // Don't flood logs with common network blips
      if (err.code === 'EPIPE' || err.code === 'ECONNRESET') {
        logger.info(`Redis: Temporary socket reset (retrying automatically)`);
      } else {
        logger.warn(`Redis Connection Warning: ${err.message}`);
      }
    });

    redis.on('connect', () => {
      logger.info('Connected to Redis');
    });

    redis.on('reconnecting', () => {
      // Using info instead of warn to keep the logs clean during blips
      logger.info('Redis: Reconnecting to Upstash...');
    });
  } catch (err: any) {
    logger.warn(`Redis Initialization Failure: ${err.message}`);
  }
}

/**
 * Safely fetches a value from Cache. 
 * Falls back to NULL (standard DB) if Redis is down.
 */
export const getCache = async (key: string): Promise<string | null> => {
  if (!redis) return null;
  try {
    // Using a timeout on the GET itself so app doesn't hang if Redis is struggling
    const result = await Promise.race([
      redis.get(key),
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
    ]);
    return result;
  } catch (err) {
    return null;
  }
};

/**
 * Safely sets a value in Cache.
 */
export const setCache = async (key: string, value: string, ttlSeconds: number = 300): Promise<void> => {
  if (!redis) return;
  try {
    await redis.setex(key, ttlSeconds, value);
  } catch (err) {
    // Fail silently
  }
};

export default redis;
