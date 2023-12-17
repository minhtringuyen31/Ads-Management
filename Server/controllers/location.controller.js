import createError from "http-errors";
import LocationService from "../services/location.service.js";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LocationController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await LocationService.getAll(filter, '-password -refreshToken');
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
    revereGeocode: async (req, res, next) => {
        const lat = req.query.lat; // Lấy giá trị của tham số 'lat' từ URL
        const lng = req.query.lng; // Lấy giá trị của tham số 'lng' từ URL
        const options = {
            method: 'GET',
            url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        };

        try {
            const response = await axios(options);
            res.json({
                message: "Reverse geocoding location successfully",
                status: 200,
                data: response.data
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }
    },
    create: async (req, res, next) => {
        try {

            const data = req.body
            const location = await LocationService.create(data);
            if (!location) {
                return next(createError.BadRequest("Location not found"))
            }
            res.json({
                message: "Create location successfully",
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
            const location = await LocationService.update(id, data);
            if (!location) {
                return next(createError.BadRequest("Location not found"))
            }
            res.json({
                message: "Create location successfully",
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
            const location = await LocationService.getById(id);
            if (!location) {
                return next(createError.BadRequest("Location not found"))
            }
            res.json({
                message: "Get location detail successfully",
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
            const location = await LocationService.delete(id);
            if (!location) {
                return next(createError.BadRequest("Location not found"))
            }
            res.json({
                message: "Delete location successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },
    healthCheck: async (req, res, next) => {
        try {
            const healthCheck = await LocationService.healthCheck();
            console.log(healthCheck);
            res.json({
                message: "Ok",
                status: 200,
                data: healthCheck
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }




};

export default LocationController;
