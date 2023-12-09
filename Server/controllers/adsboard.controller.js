import createError from "http-errors";
import AdsBoardService from "../services/ads_board.service.js";
const AdsBoardController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await AdsBoardService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("AdsBoard list not found"))
            }
            res.json({
                message: "Get AdsBoard list successfully",
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
            const location = await AdsBoardService.create(data);
            if (!location) {
                return next(createError.BadRequest("AdsBoard not found"))
            }
            res.json({
                message: "Create AdsBoard successfully",
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
            const location = await AdsBoardService.update(id, data);
            if (!location) {
                return next(createError.BadRequest("AdsBoard not found"))
            }
            res.json({
                message: "Create AdsBoard successfully",
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
            const location = await AdsBoardService.getDetail(i);
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
            const location = await AdsBoardService.delete(id);
            if (!location) {
                return next(createError.BadRequest("AdsBoard not found"))
            }
            res.json({
                message: "Delete AdsBoard successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }
};

export default AdsBoardController;
