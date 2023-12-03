import createError from "http-errors";
import WardService from "../services/ward.service.js";
const WardController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await WardService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("Ward list not found"))
            }
            res.json({
                message: "Get Ward list successfully",
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
            const location = await WardService.create(data);
            if (!location) {
                return next(createError.BadRequest("Ward not found"))
            }
            res.json({
                message: "Create Ward successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },



};

export default WardController;
