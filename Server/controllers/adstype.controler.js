import createError from "http-errors";
import AdsTypeService from "../services/ads_type.service.js";
const AdsTypeController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await AdsTypeService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("AdsType list not found"))
            }
            res.json({
                message: "Get AdsType list successfully",
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
            const location = await AdsTypeService.create(data);
            if (!location) {
                return next(createError.BadRequest("AdsType not found"))
            }
            res.json({
                message: "Create AdsType successfully",
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
            const location = await AdsTypeService.update(id, data);
            if (!location) {
                return next(createError.BadRequest("AdsType not found"))
            }
            res.json({
                message: "Update AdsType successfully",
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
            const location = await AdsTypeService.getDetail(i);
            if (!location) {
                return next(createError.BadRequest("Record not found"))
            }
            res.json({
                message: "Get detail AdsType successfully",
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
            const location = await AdsTypeService.delete(id);
            if (!location) {
                return next(createError.BadRequest("AdsType not found"))
            }
            res.json({
                message: "Delete AdsType successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }
};

export default AdsTypeController;
