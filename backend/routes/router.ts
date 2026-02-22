import { Router } from "express";
import { registerUser, loginUser, refreshToken, logoutUser } from "../controller/authentication.js";
import {verifyToken} from "../middlewear/auth.js";
import {authorise} from "../middlewear/checkRoles.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout",verifyToken, logoutUser);

export default router;
