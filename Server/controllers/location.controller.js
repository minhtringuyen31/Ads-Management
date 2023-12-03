import createError from "http-errors";
import LocationService from "../services/location.service.js";
const AdminController = {
    getAllLocation: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await LocationService.getAllLocation(filter, '-password -refreshToken');
            if (!users) {
                return next(createError.BadRequest("Location list not found"))
            }
            res.json({
                message: "Get location list successfully",
                status: 200,
                data: users
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },
};

export default AdminController;
