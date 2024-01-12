import createError from "http-errors";
import NotificationService from "../services/notification.service.js";
const NotificationController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await NotificationService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("Notification list not found"))
            }
            res.json({
                message: "Get Notification list successfully",
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
            const location = await NotificationService.create(data);
            if (!location) {
                return next(createError.BadRequest("Notification not found"))
            }
            res.json({
                message: "Create Notification successfully",
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
            const location = await NotificationService.update(id, data);
            if (!location) {
                return next(createError.BadRequest("Notification not found"))
            }
            res.json({
                message: "Update Notification successfully",
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
            const location = await NotificationService.getDetail(id);
            if (!location) {
                return next(createError.BadRequest("Notification not found"))
            }
            res.json({
                message: "Get Notification detail successfully",
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
            const location = await NotificationService.delete(id);
            if (!location) {
                return next(createError.BadRequest("Notification not found"))
            }
            res.json({
                message: "Delete Notification successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },




};

export default NotificationController;
