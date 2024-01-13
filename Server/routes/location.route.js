import express from 'express';
import LocationController from '../controllers/location.controller.js';
import uploadCloud from '../middlewares/uploader.js';
import authenticate from '../middlewares/authenticate.js';
import { createLocationValidation, updateLocationValidation } from '../validators/location.validator.js';
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
 *     Location:
 *       type: object
 *       properties:
 *         coordinate:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *         display_name:
 *           type: string
 *         address:
 *           type: string
 *         ward:
 *           type: string
 *         district:
 *           type: string
 *         location_type:
 *           type: string
 *         ads_type:
 *           type: string
 *         image:
 *           type: array
 *           items:
 *             type: string
 *         is_planned:
 *           type: boolean
 *       required:
 *         - coordinate
 *         - address
 *         - ward
 *         - district
 *         - location_type
 *         - ads_type
 *         - image
 */



/**
 * @openapi
 * paths:
 *   /locations:
 *     get:
 *       summary: Get all locations
 *       tags:
 *          - Locations
 *       responses:
 *         '200':
 *           description: Get locations successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   status:
 *                     type: integer
 *                   size_all:
 *                     type: integer
 *                   size:
 *                     type: integer
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Location'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /location/{id}:
 *     get:
 *       summary: Get location by ID
 *       tags:
 *          - Locations
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the location
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Get location successfully
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
 *                     $ref: '#/components/schemas/Location'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /location:
 *     post:
 *       summary: Create a new location
 *       tags:
 *          - Locations
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       responses:
 *         '200':
 *           description: Create location successfully
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
 *                     $ref: '#/components/schemas/Location'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /location/{id}:
 *     put:
 *       summary: Update location by ID
 *       tags:
 *          - Locations
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the location
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       responses:
 *         '200':
 *           description: Update location successfully
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
 *                     $ref: '#/components/schemas/Location'
 *       security:
 *         - BearerAuth: []
 */

/**
 * @openapi
 * paths:
 *   /location/{id}:
 *     delete:
 *       summary: Delete location by ID
 *       tags:
 *          - Locations
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the location
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Delete location successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   status:
 *                     type: integer
 *       security:
 *         - BearerAuth: []
 */


router.get('/location/healthCheck', LocationController.healthCheck);

// Đọc danh sách tất cả các đối tượng Location
router.get('/locations', authenticate, LocationController.getAll);
router.get('/locations/citizen', LocationController.getAll_citizen);
router.get('/location/reverse-geocoding', LocationController.revereGeocode);

//Đọc một Location cụ thể bằng ID
router.get('/location/:id', LocationController.getDetail);

// Tạo mới một Location
router.post('/location', updateLocationValidation, uploadCloud.array('image'), LocationController.create);

// Cập nhật một Location bằng ID
router.put('/location/:id', updateLocationValidation, uploadCloud.array('image'), LocationController.update);

// Xóa một Location bằng ID
router.delete('/location/:id', LocationController.delete);

export default router;


