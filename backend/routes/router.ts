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
import { getManagerAccess, handleRequest, getAll as getManagerAll, updateManagerProfile, getPublicManagerProfile } from "../controller/manager_Access.js";
import { restrictManager, restrictUser, addAdmin, getAdminDashboard, generateAccessKey, remoteShutdown, addSuperAdmin } from "../controller/admin_access.js";
import { getMarketQuotes, searchStockController, postMarketQuotes, postStockDetails, getMarketCategories, getStockHistory } from "../controller/market_data.js";
import { updateUserSettings } from "../controller/settingsController.js";
import { updateProfile, deactivateAccount } from "../controller/userController.js";
import { getNotifications, markNotificationsRead } from "../controller/notificationController.js";
import rateLimit from "express-rate-limit";
import passport from "passport";
import { getAIInsightsController } from "../controller/aiController.js";
import { createReport, getAllReports, updateReportStatus, deleteReport } from "../controller/reportController.js";

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

// --- Market Data ---
router.post("/market/quotes", verifyToken,authorise([Roles.ADMIN,Roles.MANAGER]), postMarketQuotes);
router.get("/market/quotes",verifyTokenOptional, getMarketQuotes);
router.post("/market/search", verifyTokenOptional, searchStockController);
router.post("/market/stock-details", verifyTokenOptional, postStockDetails);
router.get("/market/history/:symbol", verifyTokenOptional, getStockHistory);
router.get("/market/categories", verifyTokenOptional, getMarketCategories);

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

// --- Client (User) Routes ---
router.post("/client/add/manager", verifyToken, authorise([Roles.USER]), add_manager_to_client);
router.post("/client/remove/manager", verifyToken, authorise([Roles.USER]), remove_manager_to_client);
router.post("/client/buy/stock", verifyToken, authorise([Roles.USER]), buyStock);
router.post("/client/sell/stock", verifyToken, authorise([Roles.USER]), sellStock);
router.get("/client/dashboard", verifyToken, authorise([Roles.USER]), getClientAll);

// --- Manager Routes ---
router.post("/manager/handle/request", verifyToken, authorise([Roles.MANAGER]), handleRequest);
router.get("/manager/dashboard", verifyToken, authorise([Roles.MANAGER]), getManagerAll);
router.post("/manager/profile", verifyToken, authorise([Roles.MANAGER]), updateManagerProfile);
router.get("/manager/public-profile/:managerId", verifyToken, getPublicManagerProfile);

// --- Admin Routes ---
// User/Manager Management
router.get("/admin/dashboard", verifyToken, authorise([Roles.ADMIN]), getAdminDashboard)
router.post("/restrict/user", verifyToken, authorise([Roles.ADMIN]), restrictUser);
router.post("/restrict/manager", verifyToken, authorise([Roles.ADMIN]), restrictManager);
router.post("/add-super-admin", verifyToken, addSuperAdmin);
router.post("/admin/add/admin", verifyToken, authorise([Roles.ADMIN]), addAdmin)
router.post("/manager/approval/key", verifyToken, authorise([Roles.ADMIN]), generateAccessKey)
router.post("/admin/emergency-shutdown", verifyToken, authorise([Roles.ADMIN]), remoteShutdown);

// --- Report & Incident Routes ---
router.post("/reports", verifyToken, createReport); // Users & Managers can report a problem
router.get("/admin/reports", verifyToken, authorise([Roles.ADMIN]), getAllReports);
router.patch("/admin/reports/status", verifyToken, authorise([Roles.ADMIN]), updateReportStatus);
router.delete("/admin/reports/delete", verifyToken, authorise([Roles.ADMIN]), deleteReport); // Controller handles Super Admin check



export default router;
