import express from 'express';
import User from '../controllers/user.controller.js';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: APIs for managing users
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         password:
 *           type: string
 *         avatar:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         userRole:
 *           type: string
 *           enum: ['anonymous', 'province_officer', 'ward_officer', 'district_officer']
 *         gender:
 *           type: string
 *           enum: ['male', 'female', 'other']
 *       required:
 *         - fullname
 *         - email
 *         - phone
 *         - userRole
 *         - gender
 */

/**
 * @openapi
 * paths:
 *   /users:
 *     get:
 *       summary: Get all users
 *       tags:
 *          - Users
 *       responses:
 *         '200':
 *           description: Get users successfully
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
 *                       $ref: '#/components/schemas/User'
 */

/**
 * @openapi
 * paths:
 *   /user/{id}:
 *     get:
 *       summary: Get user by ID
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Get user by ID successfully
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
 *                     $ref: '#/components/schemas/User'
 */


/**
 * @openapi
 * paths:
 *   /user:
 *     post:
 *       summary: Create a new user
 *       tags:
 *         - Users
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               fullname: "John Doe"
 *               email: "thienkhtn113@gmail.com"
 *               phone: "123456789"
 *               password: "123456"
 *               avatar: "https://example.com/avatar.jpg"
 *               dob: "1990-01-01"
 *               userRole: "province_officer"
 *               gender: "male"
 *       responses:
 *         '200':
 *           description: Create user successfully
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
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @openapi
 * paths:
 *   /user/{id}:
 *     put:
 *       summary: Update user by ID
 *       tags:
 *         - Users
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
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Update user by ID successfully
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
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @openapi
 * paths:
 *   /user/{id}:
 *     delete:
 *       summary: Delete user by ID
 *       tags:
 *         - Users
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Delete user by ID successfully
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
 *                     $ref: '#/components/schemas/User'
 */


router.get('/users', User.getAll);

router.get('/user/:id', User.getDetail);

router.post('/user', User.create);

router.put('/user/:id', User.update);

router.delete('/user/:id', User.delete);

export default router;
