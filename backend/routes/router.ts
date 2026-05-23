import { Router } from "express";
import { registerUser, loginUser, refreshToken, logoutUser, 
  verifyEmail, sendToken,
  getMe } from "../controller/authentication.js";
import { googleAuth } from "../controller/authentication.js";
import logger from "../winstonlog/logger.js";
import { verifyToken,verifyTokenOptional } from "../middlewear/auth.js";
import { authorise } from "../middlewear/checkRoles.js";
import { Roles } from "@prisma/client";
import { add_manager_to_client, remove_manager_to_client, buyStock, sellStock, getAll as getClientAll } from "../controller/client_access.js";
import { getManagerAccess, handleRequest, getAll as getManagerAll, 
  updateManagerProfile, getPublicManagerProfile } from "../controller/manager_Access.js";
import { restrictManager, restrictUser, addAdmin, getAdminDashboard, generateAccessKey,
   remoteShutdown, addSuperAdmin, getUserAcquisitionData } from "../controller/admin_access.js";
import { getMarketQuotes, searchStockController, postMarketQuotes, postStockDetails,
   getMarketCategories, getStockHistory, getFundamentals, getPeers,
    getHistoricalFundamentalsController, getFeaturedStocks, getWatchlist, 
    addToWatchlist, removeFromWatchlist } from "../controller/market_data.js";
import { updateUserSettings } from "../controller/settingsController.js";
import { updateProfile, deactivateAccount, updateTerms } from "../controller/userController.js";
import { getNotifications, markNotificationsRead } from "../controller/notificationController.js";
import rateLimit from "express-rate-limit";
import passport from "passport";
import { getAIInsightsController } from "../controller/aiController.js";
import { createReport, getAllReports, updateReportStatus, deleteReport } from "../controller/reportController.js";
import { trackFrontendEvent, submitFeedback, getAnalyticsOverview } from "../controller/analytics.js";
import { handleContactUs } from "../controller/generalController.js";


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increased from 5 to 100 for production setup
  message: { success: false, message: "Too many attempts, please try again after 15 minutes" }
});



const router = Router();

// Google Auth Routes
router.get("/auth/google", (req, res, next) => {
  logger.info("Initiating Google OAuth login...");
  next();
}, passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  (req, res, next) => {
    logger.info("Received Google OAuth callback...");
    next();
  },
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err: any, user: any, info: any) => {
      const frontendUrl = process.env.NODE_ENV === "production" 
        ? process.env.FRONTEND_URL 
        : "http://localhost:5173";

      if (err || !user) {
        logger.error("Google OAuth Error: ", err || info);
        return res.redirect(`${frontendUrl}/login?error=oauth_failed`);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  googleAuth
);
router.post("/ai", getAIInsightsController);
// --- Health Check ---
router.get("/health", (req, res) => res.status(200).json({ success: true, message: "Server is healthy" }));

// --- Public / General Routes ---
router.post("/contact-us", handleContactUs);

// --- Market Data ---
router.post("/market/add-stock", verifyToken,authorise([Roles.ADMIN,Roles.MANAGER]), postMarketQuotes);
router.post("/market/quotes",verifyTokenOptional, getMarketQuotes);
router.post("/market/search", verifyTokenOptional, searchStockController);
router.post("/market/stock-details", verifyTokenOptional, postStockDetails);
router.post("/market/history", verifyTokenOptional, getStockHistory);
router.post("/market/categories", verifyTokenOptional, getMarketCategories);

// --- SEC Fundamentals ---
router.post("/market/fundamentals", verifyTokenOptional, getFundamentals);
router.get("/market/historical-fundamentals/:symbol", verifyToken, authorise([Roles.ADMIN,Roles.MANAGER,Roles.USER]), getHistoricalFundamentalsController);
router.post("/market/peers", verifyToken,authorise([Roles.ADMIN,Roles.MANAGER]), getPeers);

// --- Authentication Routes ---
router.post("/register", registerUser);
router.post("/verify/email", verifyEmail);
router.post("/send-token", sendToken);
process.env.NODE_ENV === "production" ? router.post("/login", authLimiter,loginUser) : router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", verifyToken, logoutUser);
router.post("/generate-access-key", verifyToken, generateAccessKey);
router.post("/manager-access-key", verifyToken, generateAccessKey);
router.post("/admin-access-key", verifyToken, generateAccessKey);
router.post("/get/manager/access", verifyToken, authorise([Roles.USER]), getManagerAccess);
router.get("/get/me", verifyToken, getMe);

// --- Settings & Notifications ---
router.patch("/user/settings", verifyToken, updateUserSettings);
router.patch("/user/profile", verifyToken, updateProfile);
router.post("/user/deactivate", verifyToken, deactivateAccount);

router.get("/user/notifications", verifyToken, getNotifications);
router.patch("/user/notifications/read", verifyToken, markNotificationsRead);

// --- Client /(User) Routes ---
router.post("/client/add/manager", verifyToken, authorise([Roles.USER]), add_manager_to_client);
router.post("/client/remove/manager", verifyToken, authorise([Roles.USER]), remove_manager_to_client);
router.post("/client/buy/stock", verifyToken, authorise([Roles.USER]), buyStock);
router.post("/client/sell/stock", verifyToken, authorise([Roles.USER]), sellStock);
router.get("/client/dashboard", verifyToken, authorise([Roles.USER]), getClientAll);
router.post("/admin/add/admin", verifyToken, authorise([Roles.ADMIN,Roles.USER]), addAdmin)
router.post("/user/terms", verifyToken, updateTerms);

// --- Manager Routes ---
router.post("/manager/handle/request", verifyToken, authorise([Roles.MANAGER]), handleRequest);
router.get("/manager/dashboard", verifyToken, authorise([Roles.MANAGER]), getManagerAll);
router.post("/manager/profile", verifyToken, authorise([Roles.MANAGER]), updateManagerProfile);
router.post("/manager/public-profile", verifyToken, getPublicManagerProfile);

// --- Admin Routes ---
// User/Manager Management
router.get("/admin/dashboard", verifyToken, authorise([Roles.ADMIN]), getAdminDashboard)
router.post("/restrict/user", verifyToken, authorise([Roles.ADMIN]), restrictUser);
router.post("/restrict/manager", verifyToken, authorise([Roles.ADMIN]), restrictManager);
router.post("/add-super-admin", verifyToken, addSuperAdmin);
router.post("/admin/add/admin", verifyToken, authorise([Roles.ADMIN]), addAdmin)
router.post("/manager/approval/key", verifyToken, authorise([Roles.ADMIN]), generateAccessKey)
router.post("/admin/emergency-shutdown", verifyToken, authorise([Roles.ADMIN]), remoteShutdown);
router.get("/admin/acquisition-analytics", verifyToken, authorise([Roles.ADMIN]), getUserAcquisitionData);

// --- Report & Incident Routes ---
router.post("/reports", verifyToken, createReport); // Users & Managers can report a problem
router.get("/admin/reports", verifyToken, authorise([Roles.ADMIN]), getAllReports);
router.patch("/admin/reports/status", verifyToken, authorise([Roles.ADMIN]), updateReportStatus);
router.delete("/admin/reports/delete", verifyToken, authorise([Roles.ADMIN]), deleteReport); // Controller handles Super Admin check


// --- Analytics (User Facing) ---
router.post("/stream/event", verifyTokenOptional, trackFrontendEvent);
router.post("/stream/feedback", verifyToken, submitFeedback);
// --- Analytics (Admin Facing) ---
router.get("/admin/stream/overview", verifyToken, authorise([Roles.ADMIN, Roles.MANAGER]), getAnalyticsOverview);


// Watchlist Routes
router.get("/watchlist/featured", verifyToken, authorise([Roles.USER, Roles.MANAGER]), getFeaturedStocks);
router.get("/watchlist", verifyToken, authorise([Roles.USER, Roles.MANAGER]), getWatchlist);
router.post("/watchlist/add", verifyToken, authorise([Roles.USER, Roles.MANAGER]), addToWatchlist);
router.delete("/watchlist/remove", verifyToken, authorise([Roles.USER, Roles.MANAGER]), removeFromWatchlist);

export default router;
