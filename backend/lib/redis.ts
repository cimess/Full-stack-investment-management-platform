import { Redis } from 'ioredis';
import logger from '../winstonlog/logger.js';

let redis: Redis | null = null;

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

try {
  redis = new Redis(redisUrl, {
    // ── Upstash & Render Optimized Config ──
    maxRetriesPerRequest: null, 
    enableReadyCheck: false,     
    enableOfflineQueue: false,    // CRITICAL: Prevents EPIPE by not flushing commands to dead sockets
    connectTimeout: 15000,        // Louder timeout for cloud handshakes
    commandTimeout: 10000,        
    
    // KeepAlive is vital for preventing Upstash from killing idle connections
    keepAlive: 10000,             
    
    // Automatic TLS for rediss://
    tls: redisUrl.startsWith('rediss://') ? {
      rejectUnauthorized: false,
      servername: new URL(redisUrl).hostname, // Helps with some cloud SNI issues
    } : undefined,

    retryStrategy(times: number) {
      if (times > 10) {
        logger.warn('Redis reconnection failed after 10 attempts.');
        return null; 
      }
      // Exponential backoff
      return Math.min(times * 200, 5000);
    },
  });

  redis.on('error', (err: any) => {
    // Swallow EPIPE/ECONNRESET specifically as they are handled by internal retries
    if (err.code === 'EPIPE' || err.code === 'ECONNRESET') {
      logger.warn(`Redis Socket Warning (${err.code}): Connection reset by peer. Client will reconnect.`);
    } else {
      logger.warn(`Redis connection error: ${err.message}.`);
    }
  });

  redis.on('connect', () => {
    logger.info('Connected to Redis');
  });

  redis.on('reconnecting', () => {
    logger.info('Redis attempting to reconnect...');
  });
} catch (err: any) {
  logger.warn(`Could not initialize Redis client: ${err.message}`);
}

/**
 * Helper to safely get cached value.
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
