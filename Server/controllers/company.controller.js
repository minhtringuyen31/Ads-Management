import createError from "http-errors";
import CompanyService from "../services/company.service.js";
const CompanyController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await CompanyService.getAll(filter, '');
            if (!users) {
                return next(createError.BadRequest("Company list not found"))
            }
            res.json({
                message: "Get Company list successfully",
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
            const location = await CompanyService.create(data);
            if (!location) {
                return next(createError.BadRequest("Company not found"))
            }
            res.json({
                message: "Create Company successfully",
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
            const location = await CompanyService.update(id, data);
            if (!location) {
                return next(createError.BadRequest("Company not found"))
            }
            res.json({
                message: "Create Company successfully",
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
            const location = await CompanyService.getById(id);
            if (!location) {
                return next(createError.BadRequest("Company not found"))
            }
            res.json({
                message: "Get Company successfully",
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
            const location = await CompanyService.delete(id);
            if (!location) {
                return next(createError.BadRequest("Company not found"))
            }
            res.json({
                message: "Delete Company successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }




};

export default CompanyController;
