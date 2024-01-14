import express from "express";
import AdsBoardController from "../controllers/adsboard.controller.js";
import uploadCloud from "../middlewares/uploader.js";
import authenticate from "../middlewares/authenticate.js";
import {
  createAdsBoardValidation,
  updateAdsBoardValidation,
} from "../validators/adsBoard.validator.js";
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
 *     AdsBoard:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the ads board
 *         location:
 *           type: string
 *           description: The ID of the location (if applicable)
 *         adsboard_type:
 *           type: string
 *           description: The ID of the ads board type
 *         width:
 *           type: number
 *           description: The width of the ads board
 *         height:
 *           type: number
 *           description: The height of the ads board
 *         contract_end_date:
 *           type: string
 *           format: date
 *           description: The end date of the contract
 *         contract_start_date:
 *           type: string
 *           format: date
 *           description: The start date of the contract
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         company:
 *           type: string
 *           description: The ID of the company
 *       example:
 *         _id: "60c1ea61c485c30015f42a2b"
 *         location: "60c1ea61c485c30015f42a2c"
 *         adsboard_type: "60c1ea61c485c30015f42a2d"
 *         width: 3
 *         height: 12
 *         contract_end_date: "2023-12-31"
 *         contract_start_date: "2023-01-01"
 *         image: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         company: "60c1ea61c485c30015f42a2e"
 */


/**
 * @openapi
 * paths:
 *   /adsboards:
 *     get:
 *       summary: Get all ads boards
 *       tags: [AdsBoard]
 *       description: Retrieve a list of all ads boards
 *       responses:
 *         '200':
 *           description: Get ads boards successfully
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
 *                     description: Total number of ads boards in the system
 *                   size:
 *                     type: integer
 *                     description: Number of ads boards returned in this response
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/AdsBoard'
 *       security:
 *         - BearerAuth: []
 */


/**
 * @openapi
 * paths:
 *   /adboardsByLocation/{id}:
 *     get:
 *       summary: Get all ads boards by location ID
 *       tags: [AdsBoard]
 *       description: Retrieve a list of all ads boards associated with a specific location
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the location
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Get ads boards by location ID successfully
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
 *                     description: Total number of ads boards for the location
 *                   size:
 *                     type: integer
 *                     description: Number of ads boards returned in this response
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/AdsBoard'
 */

/**
 * @openapi
 * paths:
 *   /adsboard/{id}:
 *     get:
 *       summary: Get details of an ads board by ID
 *       tags: [AdsBoard]
 *       description: Retrieve details of a specific ads board by its ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the ads board
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Get ads board details successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AdsBoard'
 */

/**
 * @openapi
 * paths:
 *   /adsboard:
 *     post:
 *       summary: Create a new ads board
 *       tags: [AdsBoard]
 *       description: Create a new ads board with the provided information
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdsBoardInput'
 *       responses:
 *         '201':
 *           description: Ads board created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AdsBoard'
 *         '400':
 *           description: Bad request (validation error)
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */

/**
 * @openapi
 * paths:
 *   /adsboard/{id}:
 *     put:
 *       summary: Update an existing ads board by ID
 *       tags: [AdsBoard]
 *       description: Update an existing ads board with the provided information
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the ads board
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdsBoardInput'
 *       responses:
 *         '200':
 *           description: Ads board updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AdsBoard'
 *         '400':
 *           description: Bad request (validation error)
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '404':
 *           description: Ads board not found
 *           content:
 *             application/json:
 */

// Đọc danh sách tất cả các đối tượng Location
router.get("/adsboards", authenticate, AdsBoardController.getAll);

router.get(
  "/adboardsByLocation/:id",
  AdsBoardController.getAllAdBoardByLocation
);

// // Đọc một Location cụ thể bằng ID
router.get("/adsboard/:id", AdsBoardController.getDetail);

// // Tạo mới một Location
router.post(
  "/adsboard",
  uploadCloud.array("image"),
  AdsBoardController.create
);

// // Cập nhật một Location bằng ID
router.put(
  "/adsboard/:id",
  updateAdsBoardValidation,
  uploadCloud.array("image"),
  AdsBoardController.update
);

// // Xóa một Location bằng ID
router.delete("/adsboard/:id", AdsBoardController.delete);

export default router;
