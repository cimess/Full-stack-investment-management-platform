import dotenv from "dotenv";
dotenv.config();
import logger from "./winstonlog/logger.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import type { ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import { startMarketWorker } from "./workers/marketWorker.js";
import { startMarketCacheWorker } from "./workers/marketCacheWorker.js";
import { prisma } from "./lib/prisma.js";
import passport from "./config/passport.js";
import { scannerLimiter } from "./middlewear/404Limiter.js";
import { monitorEventLoopDelay, performance, PerformanceObserver } from "perf_hooks";

if (!BigInt.prototype.hasOwnProperty('toJSON')) {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
}


const app = express();
app.set("trust proxy", 1);
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
  skip: (req) => req.path === "/api/health" || req.path === "/health",
}));

// Domain Enforcement: Redirect or block requests to the default .onrender.com URL
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    const host = req.get("host");
    const allowedHosts = ["api.cimessinvest.com", "full-stack-investment-management-platform.onrender.com"];

    // Allow the health check or local requests if needed, but enforce custom domain for all else
    const isHealthCheck = req.path === "/api/health" || req.path === "/health";

    if (host && !allowedHosts.includes(host) && !host.includes("localhost") && !isHealthCheck) {
      logger.warn(`Security: Request to unauthorized host ${host} from ${req.ip}. Blocking.`);
      return res.status(403).json({
        success: false,
        message: "Unauthorized domain. Please use the official API domain."
      });
    }
    next();
  });
}

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


// CPU + Event Loop monitor

// CPU & event loop monitor
const h = monitorEventLoopDelay();
h.enable();

app.use((req, res, next) => {
  const start = performance.now();

  // set headers early with a getter
  res.setHeader("x-node-time-ms", 0);  // placeholder
  res.setHeader("x-event-loop-ms", 0); // placeholder

  res.on("finish", () => {
    const duration = (performance.now() - start).toFixed(2);
    const loopLag = (h.mean / 1e6).toFixed(2);
    console.log(`[${req.ip}] ${req.method} ${req.originalUrl} → ${res.statusCode} | node_ms: ${duration} | loop_ms: ${loopLag}`);

    // update headers if needed before response is sent
    // actually, cannot do here
  });

  // overwrite headers in a middleware before sending
  res.on("header", () => {
    res.setHeader("x-node-time-ms", (performance.now() - start).toFixed(2));
    res.setHeader("x-event-loop-ms", h.mean.toFixed(2));
  });

  next();
});




// --- Routes ---


app.use("/api", router);

// --- 404 & Scanner Protection ---
// Global catch-all for any unmatched route (including root / and invalid /api routes)
app.use(scannerLimiter, (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`
  });
});


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
    // Run the market worker in both development and production
    // to ensure live data is fetched across all environments.
    startMarketWorker();
    startMarketCacheWorker();


    if (process.env.NODE_ENV === "production") {
      // Database Keep-alive Ping (Prevents Render DB Sleep)
      setInterval(async () => {
        try {
          await prisma.$queryRaw`SELECT 1`;
          logger.info("Database ping successful (Keep-alive)");
        } catch (err) {
          logger.error("Database ping failed (Keep-alive):", err);
        }
      }, 45 * 60 * 1000); // 45 minutes
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


``