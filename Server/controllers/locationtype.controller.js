import createError from "http-errors";
import LocationTypeService from "../services/locationtype.service.js";
const LocationTypeController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await LocationTypeService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("LocationType list not found"))
            }
            res.json({
                message: "Get LocationType list successfully",
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
            const location = await LocationTypeService.create(data);
            if (!location) {
                return next(createError.BadRequest("LocationType not found"))
            }
            res.json({
                message: "Create LocationType successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },



};

export default LocationTypeController;
