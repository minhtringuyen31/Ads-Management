import express from 'express';
import AuthorizeRequestController from '../controllers/authorizeRequest.controller.js';
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
 *     AuthorizeRequest:
 *       type: object
 *       properties:
 *         new_ads_board:
 *           type: object
 *           properties:
 *             location:
 *               type: string
 *               description: ID of the location
 *             adsboard_type:
 *               type: string
 *               description: ID of the adsboard type
 *             width:
 *               type: number
 *               description: Width of the adsboard
 *             height:
 *               type: number
 *               description: Height of the adsboard
 *             contract_end_date:
 *               type: string
 *               format: date
 *               description: End date of the contract
 *             contract_start_date:
 *               type: string
 *               format: date
 *               description: Start date of the contract
 *             image:
 *               type: array
 *               items:
 *                 type: string
 *               description: Array of image URLs
 *             name:
 *               type: string
 *               description: Name of the adsboard
 *             address:
 *               type: string
 *               description: Address of the adsboard
 *             contact_name_person:
 *               type: string
 *               description: Contact person's name
 *             phone:
 *               type: string
 *               description: Contact person's phone number
 *             email:
 *               type: string
 *               description: Contact person's email
 *             website:
 *               type: string
 *               description: Website URL (optional)
 *             description:
 *               type: string
 *               description: Description of the adsboard (optional)
 *           required:
 *             - adsboard_type
 *             - width
 *             - height
 *             - contract_end_date
 *             - contract_start_date
 *             - image
 *             - name
 *             - address
 *             - contact_name_person
 *             - phone
 *             - email
 *         status:
 *           type: string
 *           enum: ["pending", "completed", "cancelled", "rejected"]
 *           default: "pending"
 *           description: Status of the authorization request
 *         isDelete:
 *           type: boolean
 *           default: false
 *           description: Indicates whether the authorization request is marked for deletion
 *       required:
 *         - new_ads_board
 *         - status
 */

/**
 * @openapi
 * paths:
 *   /authorizeRequests:
 *     get:
 *       summary: Get all authorization requests
 *       tags:
 *          - Authroize Requests
 *       description: Retrieve a list of all authorization requests
 *       responses:
 *         '200':
 *           description: Get authorization requests successfully
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
 *                     description: Total number of authorization requests in the system
 *                   size:
 *                     type: integer
 *                     description: Number of authorization requests returned in this response
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/AuthorizeRequest'
 *       security:
 *         - BearerAuth: []
 *
 *   /authorizeRequest/{id}:
 *     get:
 *       summary: Get authorization request by ID
 *       tags:
 *         - Authroize Requests
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the authorization request
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Get authorization request by ID successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthorizeRequest'
 *
 *     post:
 *       summary: Create a new authorization request
 *       tags:
 *         - Authroize Requests
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorizeRequest'
 *       responses:
 *         '201':
 *           description: Authorization request created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthorizeRequest'
 *
 *     put:
 *       summary: Update authorization request by ID
 *       tags:
 *         - Authroize Requests
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the authorization request
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthorizeRequest'
 *       responses:
 *         '200':
 *           description: Update authorization request by ID successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AuthorizeRequest'
 */



router.get('/authorizeRequests', authenticate, AuthorizeRequestController.getAll);
router.get('/authorizeRequest/:id', AuthorizeRequestController.getById);
router.post('/authorizeRequest', uploadCloud.array('new_ads_board[image]'), AuthorizeRequestController.create);
router.put('/authorizeRequest/:id', uploadCloud.array('new_ads_board[image]'), AuthorizeRequestController.update);
//router.delete('/authorizeRequest/:id', AuthorizeRequestController.delete);

export default router;
