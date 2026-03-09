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
dotenv.config();

const app = express();
export { app };

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 100 : 10000,
}));
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
    startMarketWorker(30);
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
