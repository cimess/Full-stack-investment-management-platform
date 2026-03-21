import rateLimit from "express-rate-limit";
import logger from "../winstonlog/logger.js";
import type { Request, Response } from "express";

/**
 * Specialized rate limiter for 404 Not Found errors.
 * Designed to block automated scanners and bots.
 */
export const scannerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 20, // Limit each IP to 20 404s per hour
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Suspicious activity detected. Access restricted for 1 hour.",
  },
  handler: (req: Request, res: Response) => {
    logger.warn(`Potential Scanner Blocked: IP ${req.ip} hit too many 404s at ${req.originalUrl}`);
    res.status(403).json({
      success: false,
      message: "Access blocked due to suspicious activity (multiple invalid requests).",
    });
  },
});
