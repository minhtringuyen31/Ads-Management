import express from 'express';
import ReportController from '../controllers/report.controller.js';
import authenticate from '../middlewares/authenticate.js';
import { createReportValidation, updateReportValidation } from '../validators/report.validator.js';
import uploadCloud from '../middlewares/uploader.js';
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
 *   /reports:
 *     get:
 *       summary: Get all reports
 *       tags:
 *          - Reports
 *       responses:
 *         '200':
 *           description: Get reports successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   status:
 *                     type: integer
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Report'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /reports/citizent:
 *     get:
 *       summary: Get reports for testing
 *       tags:
 *          - Reports
 *       responses:
 *         '200':
 *           description: Get testing reports successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   status:
 *                     type: integer
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Report'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         report_form:
 *           type: string
 *         coordinate:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         phone_number:
 *           type: string
 *         report_content:
 *           type: string
 *         type:
 *           type: string
 *           enum: ["location", "board", 'random']
 *         location:
 *           type: string
 *         board:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["pending", "completed"]
 *         image:
 *           type: array
 *           items:
 *             type: string
 *         operation:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *             content:
 *               type: string
 *         clientId:
 *           type: string
 *         ward:
 *           type: string
 *         district:
 *           type: string
 *         random:
 *           type: object
 *           default: false
 */

/**
 * @openapi
 * paths:
 *   /report/{id}:
 *     get:
 *       summary: Get report by ID
 *       tags:
 *          - Reports
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the report
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Get report successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   status:
 *                     type: integer
 *                   data:
 *                     $ref: '#/components/schemas/Report'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /report/{id}:
 *     put:
 *       summary: Update report by ID
 *       tags:
 *          - Reports
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the report
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       responses:
 *         '200':
 *           description: Update report successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   status:
 *                     type: integer
 *                   data:
 *                     $ref: '#/components/schemas/Report'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /report:
 *     post:
 *       summary: Create a new report
 *       tags:
 *          - Reports
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       responses:
 *         '200':
 *           description: Create report successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   status:
 *                     type: integer
 *                   data:
 *                     $ref: '#/components/schemas/Report'
 *       security:
 *         - BearerAuth: []
 */


router.get('/reports', authenticate, ReportController.getAll);
router.get('/reportGroup', authenticate, ReportController.groupReport);
router.get('/reports/citizent', ReportController.getAllTesting);
router.get('/report/:id', ReportController.getById);
router.post('/report', uploadCloud.array('image'), ReportController.create);
router.put('/report/:id', updateReportValidation, uploadCloud.array('image'), ReportController.update);

export default router;
