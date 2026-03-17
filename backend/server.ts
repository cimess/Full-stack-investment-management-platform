import logger from "./winstonlog/logger.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import type { ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import { startMarketWorker } from "./services/marketWorker.js";
import { prisma } from "./lib/prisma.js";
import passport from "./config/passport.js";
dotenv.config();


if (!BigInt.prototype.hasOwnProperty('toJSON')) {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
}


const app = express();
export { app };

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
// In production, requests arrive via Netlify reverse proxy (/api/* → this server)
// so the origin will be the Netlify domain. FRONTEND_URL must be set on Render.
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "https://accounts.google.com", "https://apis.google.com"],
      "frame-src": ["'self'", "https://accounts.google.com"],
      "connect-src": ["'self'", "https://accounts.google.com", "https://play.google.com"],
      "img-src": ["'self'", "data:", "https://lh3.googleusercontent.com"], // For Google profile pics
    },
  },
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 100 : 10000,
}));

// Production-only request logger
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.info(`[${req.method}] ${req.path} → ${res.statusCode} (${duration}ms)`);
    });
    next();
  });
}
app.use(passport.initialize());
app.use("/api", router);


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  if (statusCode === 500) {
    logger.error(`[500 Error] ${err.stack || err.message}`);
    message = process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message;
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
}

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  try {
    if(process.env.NODE_ENV==="production"){
      startMarketWorker(300,true);
    }
  } catch (err) {
    logger.error("Error in startMarketWorker:", err);
  }

  // Graceful Shutdown Function
  const gracefulShutdown = async (signal: string) => {
    logger.info(`${signal} received: Starting graceful shutdown...`);

    server.close(async () => {
      logger.info("HTTP server closed.");

      try {
        await prisma.$disconnect();
        logger.info("Database connection closed.");
        process.exit(0);
      } catch (err) {
        logger.error("Error during database disconnection:", err);
        process.exit(1);
      }
    });

    // Forced shutdown after 30 seconds if connections are stuck
    setTimeout(() => {
      logger.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 30000);
  };

  // Listen for signals
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
}
