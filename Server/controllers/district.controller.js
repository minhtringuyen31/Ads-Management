import createError from "http-errors";
import DistrictService from "../services/district.service.js";
const DistrictController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await DistrictService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("District list not found"))
            }
            res.json({
                message: "Get district list successfully",
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
            const location = await DistrictService.create(data);
            if (!location) {
                return next(createError.BadRequest("District not found"))
            }
            res.json({
                message: "Create District successfully",
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
            const location = await DistrictService.update(id, data);
            if (!location) {
                return next(createError.BadRequest("District not found"))
            }
            res.json({
                message: "Create District successfully",
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
            const location = await DistrictService.getDetail(id);
            if (!location) {
                return next(createError.BadRequest("District not found"))
            }
            res.json({
                message: "Get District successfully",
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
            const location = await DistrictService.delete(id);
            if (!location) {
                return next(createError.BadRequest("District not found"))
            }
            res.json({
                message: "Delete District successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }




};

export default DistrictController;
