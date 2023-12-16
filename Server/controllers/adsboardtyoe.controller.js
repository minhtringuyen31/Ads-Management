import createError from "http-errors";
import AdsBoardType from "../services/ads_board_type.service.js";
const AdsBoardTypeController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await AdsBoardType.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("AdsBoardType list not found"))
            }
            res.json({
                message: "Get AdsBoardType list successfully",
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
            const location = await AdsBoardType.create(data);
            if (!location) {
                return next(createError.BadRequest("AdsBoardType not found"))
            }
            res.json({
                message: "Create AdsBoardType successfully",
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
            const location = await AdsBoardType.update(id, data);
            if (!location) {
                return next(createError.BadRequest("AdsBoardType not found"))
            }
            res.json({
                message: "Update AdsBoardType successfully",
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
            const location = await AdsBoardType.getDetail(i);
            if (!location) {
                return next(createError.BadRequest("Record not found"))
            }
            res.json({
                message: "Get detail AdsBoard successfully",
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
            const location = await AdsBoardType.delete(id);
            if (!location) {
                return next(createError.BadRequest("AdsBoardType not found"))
            }
            res.json({
                message: "Delete AdsBoardType successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }




};

export default AdsBoardTypeController;
