import { Router } from "express";
import { registerUser, loginUser, refreshToken, logoutUser, verifyEmail ,getMe} from "../controller/authentication.js";
import { verifyToken } from "../middlewear/auth.js";
import { authorise } from "../middlewear/checkRoles.js";
import { Roles } from "../prisma/generated/index.js";
import { add_manager_to_client, remove_manager_to_client, buyStock, sellStock, getAll as getClientAll } from "../controller/client_access.js";
import { getManagerAccess, handleRequest, getAll as getManagerAll } from "../controller/manager_Access.js";
import { restrictManager, restrictUser, addAdmin, getAdminDashboard, managerAccessKey, remoteShutdown} from "../controller/admin_access.js";
import { getMarketQuotes, searchStockController, postMarketQuotes, postStockDetails } from "../controller/market_data.js";
import { addSuperAdmin } from "../controller/admin_access.js";
import rateLimit from "express-rate-limit";


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 login attempts allowed!
  message: { success: false, message: "Too many attempts, please try again after 15 minutes" }
});

const router = Router();

// --- Market Data ---
router.post("/market/quotes", verifyToken, postMarketQuotes);
router.get("/market/quotes", verifyToken, getMarketQuotes);
router.post("/market/search", verifyToken, searchStockController);
router.post("/market/stock-details", verifyToken, postStockDetails);

// --- Authentication Routes ---
router.post("/register", registerUser);
router.post("/verify/email", verifyEmail);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", verifyToken, logoutUser);
router.post("/get/manager/access", verifyToken, authorise([Roles.USER]), getManagerAccess);
router.get("/get/me", verifyToken, getMe);

// --- Client (User) Routes ---
router.post("/client/add/manager", verifyToken, authorise([Roles.USER]), add_manager_to_client);
router.post("/client/remove/manager", verifyToken, authorise([Roles.USER]), remove_manager_to_client);
router.post("/client/buy/stock", verifyToken, authorise([Roles.USER]), buyStock);
router.post("/client/sell/stock", verifyToken, authorise([Roles.USER]), sellStock);
router.get("/client/dashboard", verifyToken, authorise([Roles.USER]), getClientAll);

// --- Manager Routes ---
router.post("/manager/handle/request", verifyToken, authorise([Roles.MANAGER]), handleRequest);
router.get("/manager/dashboard", verifyToken, authorise([Roles.MANAGER]), getManagerAll);

// --- Admin Routes ---
// User/Manager Management
router.get("/admin/dashboard", verifyToken, authorise([Roles.ADMIN]), getAdminDashboard)
router.post("/restrict/user", verifyToken, authorise([Roles.ADMIN]), restrictUser);
router.post("/restrict/manager", verifyToken, authorise([Roles.ADMIN]), restrictManager);
router.post("/add-super-admin", verifyToken, addSuperAdmin);
router.post("/admin/add/admin", verifyToken, authorise([Roles.ADMIN]), addAdmin)
router.post("/manager/approval/key", verifyToken, authorise([Roles.ADMIN]), managerAccessKey)
router.post("/admin/emergency-shutdown", verifyToken, authorise([Roles.ADMIN]), remoteShutdown);



export default router;
