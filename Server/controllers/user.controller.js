import createError from "http-errors";
import UserService from "../services/user.service.js";
const UserController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await UserService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("User list not found"))
            }
            res.json({
                message: "Get User list successfully",
                status: 200,
                data: users
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },

    create: async (req, res, next) => {
        try {

            const data = req.body
            console.log(data);
            const location = await UserService.create(data);
            if (!location) {
                return next(createError.BadRequest("User not found"))
            }
            res.json({
                message: "Create User successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },
    update: async (req, res, next) => {
        try {

            const data = req.body
            const { id } = req.params;
            const location = await UserService.update(id, data);
            if (!location) {
                return next(createError.BadRequest("User not found"))
            }
            res.json({
                message: "Update User successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },
    getDetail: async (req, res, next) => {
        try {
            const { id } = req.params;
            const location = await UserService.getById(id);
            
            if (!location) {
                return next(createError.BadRequest("User not found"))
            }
            res.json({
                message: "Get User successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },
    delete: async (req, res, next) => {
        try {

            const { id } = req.params;
            const location = await UserService.delete(id);
            if (!location) {
                return next(createError.BadRequest("User not found"))
            }
            res.json({
                message: "Delete User successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }




};

export default UserController;
