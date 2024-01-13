import express from 'express';
import EditRequestController from '../controllers/editRequest.controller.js';
import uploadCloud from '../middlewares/uploader.js';
import authenticate from '../middlewares/authenticate.js';
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
 * components:
 *   schemas:
 *     EditRequest:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: ["location", "board"]
 *           description: Type of edit request
 *         newInformation:
 *           type: object
 *           description: New information for the edit request
 *         reason:
 *           type: string
 *           description: Reason for the edit request
 *         status:
 *           type: string
 *           enum: ["pending", "completed", "rejected", "canceled"]
 *           default: "pending"
 *           description: Status of the edit request
 *       required:
 *         - type
 *         - newInformation
 *         - status
 */



/**
 * @openapi
 * paths:
 *   /editRequests:
 *     get:
 *       summary: Get all edit requests
 *       tags:
 *          - Edit Requests
 *       description: Retrieve a list of all edit requests
 *       responses:
 *         '200':
 *           description: Get edit requests successfully
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
 *                   size_all:
 *                     type: integer
 *                     description: Total number of edit requests in the system
 *                   size:
 *                     type: integer
 *                     description: Number of edit requests returned in this response
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/EditRequest'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /editRequest/{id}:
 *     get:
 *       summary: Get edit request by ID
 *       tags:
 *          - Edit Requests
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Get edit request by ID successfully
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
 *                     $ref: '#/components/schemas/EditRequest'
 */

/**
 * @openapi
 * paths:
 *   /editRequest:
 *     post:
 *       summary: Create a new edit request
 *       tags:
 *          - Edit Requests
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditRequest'
 *       responses:
 *         '201':
 *           description: Create a new edit request successfully
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
 *                     $ref: '#/components/schemas/EditRequest'
 */

/**
 * @openapi
 * paths:
 *   /editRequest/{id}:
 *     put:
 *       summary: Update edit request by ID
 *       tags:
 *          - Edit Requests
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditRequest'
 *       responses:
 *         '200':
 *           description: Update edit request by ID successfully
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
 *                     $ref: '#/components/schemas/EditRequest'
 */

router.get('/editRequests', authenticate, EditRequestController.getAll);
router.get('/editRequest/:id', EditRequestController.getById);
router.post('/editRequest', uploadCloud.array('newInformation[image]'), EditRequestController.create);
router.put('/editRequest/:id', EditRequestController.update);
//router.delete('/editRequest/:id', EditRequestController.delete);

export default router;
