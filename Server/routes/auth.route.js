import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/forgot-password", AuthController.forgot);
router.post("/otp-check", AuthController.otpCheck)
router.post("/recovery", AuthController.recovery)

export default router;
