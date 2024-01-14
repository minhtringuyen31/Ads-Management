import express from "express";
import AuthController from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       name: Authorization
 *       in: header
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * paths:
 *   /auth/login:
 *     post:
 *       summary: Login
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginCredential:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                 loginCredential: thienkhn113@gmail.com
 *                 password: "111111"
 *       responses:
 *         '200':
 *           description: Successful login
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                   accessToken:
 *                     type: string
 *                   refreshToken:
 *                     type: string
 *                 example:
 *                   user: {}
 *                   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTk5MDA3NDgwYjkyYWZjMGE3ODUzYzQiLCJmdWxsbmFtZSI6IldhcmQgT2ZmaWNlciIsInVzZXJSb2xlIjoid2FyZF9vZmZpY2VyIiwiaWF0IjoxNzA1MDkwNzk1LCJleHAiOjE3MDUwOTEwOTV9.-jq-t6xvLtGfk8oJyzOng08fDIupBsVIrqdDXCVBJUU"
 *                   refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTk5MDA3NDgwYjkyYWZjMGE3ODUzYzQiLCJmdWxsbmFtZSI6IldhcmQgT2ZmaWNlciIsInVzZXJSb2xlIjoid2FyZF9vZmZpY2VyIiwiaWF0IjoxNzA1MDkwNzk1LCJleHAiOjE3MDc2ODI3OTV9.bMwwKWvGJjeKIdR53qvO-oVY5a_F5Zgg7prm-kgPfNk"
 */

/**
 * @openapi
 * paths:
 *   /refresh:
 *     post:
 *       summary: refresh token
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *               example:
 *                 refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTk5MDA3NDgwYjkyYWZjMGE3ODUzYzQiLCJmdWxsbmFtZSI6IldhcmQgT2ZmaWNlciIsInVzZXJSb2xlIjoid2FyZF9vZmZpY2VyIiwiaWF0IjoxNzA1MDkwNzk1LCJleHAiOjE3MDc2ODI3OTV9.bMwwKWvGJjeKIdR53qvO-oVY5a_F5Zgg7prm-kgPfNk
 *       responses:
 *         '200':
 *           description: Successful refresh
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *                   refreshToken:
 *                     type: string
 *                 example:
 *                   accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTk5MDA3NDgwYjkyYWZjMGE3ODUzYzQiLCJmdWxsbmFtZSI6IldhcmQgT2ZmaWNlciIsInVzZXJSb2xlIjoid2FyZF9vZmZpY2VyIiwiaWF0IjoxNzA1MDkwNzk1LCJleHAiOjE3MDUwOTEwOTV9.-jq-t6xvLtGfk8oJyzOng08fDIupBsVIrqdDXCVBJUU"
 *                   refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTk5MDA3NDgwYjkyYWZjMGE3ODUzYzQiLCJmdWxsbmFtZSI6IldhcmQgT2ZmaWNlciIsInVzZXJSb2xlIjoid2FyZF9vZmZpY2VyIiwiaWF0IjoxNzA1MDkwNzk1LCJleHAiOjE3MDc2ODI3OTV9.bMwwKWvGJjeKIdR53qvO-oVY5a_F5Zgg7prm-kgPfNk"
 */

/**
 * @openapi
 * paths:
 *   /forgot-password:
 *     post:
 *       summary: Send forgot password email
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *               example:
 *                 email: phamgiangthaiduong1@gmail.com
 *       responses:
 *         '200':
 *           description: Forgot password email sent successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating the result of the operation
 *                   status:
 *                     type: integer
 *                     description: HTTP status code (200 for success)
 */

/**
 * @openapi
 * paths:
 *   /otp-check:
 *     post:
 *       summary: Verify OTP
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 otp:
 *                   type: string
 *               example:
 *                 email: phamgiangthaiduong1@gmail.com
 *                 otp: "123456"
 *       responses:
 *         '200':
 *           description: OTP verification successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating the result of the operation
 *                   status:
 *                     type: integer
 *                     description: HTTP status code (200 for success)
 */

/**
 * @openapi
 * paths:
 *   /recovery:
 *     post:
 *       summary: Password recovery
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 newPassword:
 *                   type: string
 *               example:
 *                 email: phamgiangthaiduong@gmail.com
 *                 newPassword: newpassword123
 *       responses:
 *         '200':
 *           description: Password recovery successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating the result of the operation
 *                   status:
 *                     type: integer
 *                     description: HTTP status code (200 for success)
 */


/**
 * @openapi
 * paths:
 *   /change-password:
 *     post:
 *       summary: Password recovery 2
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 oldPassword:
 *                   type: string
 *                 newPassword:
 *                   type: string
 *               example:
 *                 oldPassword: oldpassword123
 *                 newPassword: newpassword123
 *       responses:
 *         '200':
 *           description: Password recovery successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating the result of the operation
 *                   status:
 *                     type: integer
 *                     description: HTTP status code (200 for success)
 *       security:
 *         - BearerAuth: []
 */

router.post("/auth/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/forgot-password", AuthController.forgot);
router.post("/otp-check", AuthController.otpCheck);
router.post("/recovery", AuthController.recovery);
router.post("/change-password", authenticate, AuthController.changePassword);

export default router;
