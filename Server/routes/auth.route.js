/**
 * @openapi
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

import express from "express";
import AuthController from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

/**
 * @openapi
 *   /auth/login:
 *     post:
 *       summary: Login user
 *       description: Endpoint to authenticate and login a user.
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: Successful login
 *         401:
 *           description: Invalid credentials
 *         500:
 *           description: Internal server error
 */

router.post("/auth/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/forgot-password", AuthController.forgot);
router.post("/otp-check", AuthController.otpCheck)
router.post("/recovery", AuthController.recovery)
router.post("/change-password", authenticate, AuthController.changePassword)

export default router;
