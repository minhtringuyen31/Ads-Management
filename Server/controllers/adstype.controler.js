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



};

export default AdsTypeController;
