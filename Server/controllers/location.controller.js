import createError from "http-errors";
import LocationService from "../services/location.service.js";
import axios from 'axios';
import dotenv from 'dotenv';
import AdsBoardService from "../services/ads_board.service.js";
import { fromJson } from "../helper/dto.js";
import { createMongooseQuery, createMongooseSortObject } from "../helper/filter.js";
import { v2 as cloudinary } from 'cloudinary';

import { extractPublicId } from 'cloudinary-build-url'
dotenv.config();

const LocationController = {
    getAll: async (req, res, next) => {
        try {
            const { filters, sort } = req.query;

            // Initialize default values if filters or sort are null or undefined
            const filtersValue = filters ? createMongooseQuery(fromJson(filters)) : {};
            const sortValue = sort ? createMongooseSortObject(fromJson(sort)) : {};

            console.log(filtersValue, sortValue);

            let locations = await LocationService.getAll(filtersValue, sortValue);
            if (!locations) {
                return next(createError.BadRequest("Location list not found"));
            }
            // for(const location of locations){
            //     const boards = await AdsBoardService.getAllAdBoardbyLocation(location._id.toString());
            //     console.log(boards.length)
            //     location.adsBoardsize = boards.length;
            // }
            const list = locations.map(async (location) => {
                const boards = await AdsBoardService.getAllAdBoardbyLocation(location._id.toString());
                console.log(boards)
                return {
                    ...location.toObject(),
                    adsBoardSize: boards.length
                }
            })
            const fresult = await Promise.all(list);
            res.json({
                message: "Get location list successfully",
                status: 200,
                data: fresult
            });
        } catch (error) {
            next(createError.InternalServerError(error.message));
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
            const files = req.files;
            if (files) {
                data.image = files.map(file => file.path);
            }
            const location = await LocationService.create(data);
            if (!location) {
                if (req.files) {
                    req.files.forEach(file => {
                        cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                            console.log(result, error);
                        });
                    });
                }
                return next(createError.BadRequest("Location not found"))
            }
            res.json({
                message: "Create location successfully",
                status: 200,
                data: location
            })

        } catch (error) {
            if (req.files) {
                req.files.forEach(file => {
                    cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                        console.log(result, error);
                    });
                });
            }
            next(createError.InternalServerError(error.message))
        }

    },
    update: async (req, res, next) => {
        try {
            const data = req.body;
            const { id } = req.params;
            const files = req.files;
            if (files) {
                data.image = files.map(file => file.path);
            }
            const location = await LocationService.update(id, data);
            if (!location) {
                if (req.files) {
                    req.files.forEach(file => {
                        cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                            console.log(result, error);
                        });
                    });
                }
                return next(createError.BadRequest("Location not found"));
            }
            res.json({
                message: "Update location successfully",
                status: 200,
                data: location
            });
        } catch (error) {
            if (req.files) {
                req.files.forEach(file => {
                    cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                        console.log(result, error);
                    });
                });
            }
            next(createError.InternalServerError(error.message));
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
