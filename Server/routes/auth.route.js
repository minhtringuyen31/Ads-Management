import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/login", AuthController.login);
router.post("/refresh", AuthController.refresh);

export default router;
