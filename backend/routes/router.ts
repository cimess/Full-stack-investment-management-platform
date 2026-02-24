import { Router } from "express";
import { registerUser, loginUser, refreshToken, logoutUser, loginManager } from "../controller/authentication.js";
import {verifyToken} from "../middlewear/auth.js";
import {authorise} from "../middlewear/checkRoles.js";
import { Roles } from "../prisma/generated/index.js"
import { add_manager_to_client, remove_manager_to_client } from "../controller/client_access.js";
import { getManagerAccess } from "../controller/manager_Access.js";
import { getAllUser, getAllManager } from "../controller/admin_access.js";

const router = Router();
router.get("/admin/all-user",verifyToken,getAllUser);
router.get("/admin/all-manager",verifyToken,getAllManager);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout",verifyToken, logoutUser);
router.post("/client/add-manager",verifyToken,authorise([Roles.USER]),add_manager_to_client);
router.post("/client/remove-manager",verifyToken,authorise([Roles.USER]),remove_manager_to_client);
router.post("/get-manager-access",verifyToken,authorise([Roles.USER]),getManagerAccess);
router.post("/manager-login",verifyToken,authorise([Roles.MANAGER]),loginManager);
export default router;
