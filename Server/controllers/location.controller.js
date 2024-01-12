import createError from "http-errors";
import LocationService from "../services/location.service.js";
import axios from 'axios';
import dotenv from 'dotenv';
import { fromJson } from "../helper/dto.js";
import { createMongooseQuery, createMongooseSortObject } from "../helper/filter.js";
import { v2 as cloudinary } from 'cloudinary';
import UserService from "../services/user.service.js";
import DistrictService from "../services/district.service.js";
import AdsBoardService from "../services/ads_board.service.js";
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
            let filteredLists = locations;
            const user = await UserService.getById(req.user.userId);
            console.log(user)
            if (!user.assigned_areaid && user.__t !== "ProvinceOfficer") {
                res.status(400).json({ message: "bạn éo có quyền" })
            }

            if (user.__t === "WardOfficer") {
                const assigned_areaid = user.assigned_areaid._id.toString();
                filteredLists = locations.filter(
                    (location) => location.ward._id.toString() === assigned_areaid
                );
            } else if (user.__t === "DistrictOfficer") {
                //console.log("assigned_areaid")
                const assigned_areaid = user.assigned_areaid._id.toString();
                filteredLists = locations.filter(
                    (location) => location.district._id.toString() === assigned_areaid
                );
            }

            const list = filteredLists.map(async (location) => {
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
                size_all: locations.length,
                size: fresult.length,
                data: fresult
            });
        } catch (error) {
            console.log(console.log(error))
            next(createError.InternalServerError(error.message));
        }
    },
    getAll_citizen: async (req, res, next) => {
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
            let filteredLists = locations;
            // 

            const list = filteredLists.map(async (location) => {
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
                size_all: locations.length,
                size: fresult.length,
                data: fresult
            });
        } catch (error) {
            console.log(console.log(error))
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
            const districtLabelRadomData = req.district
            const wardLabelRadomData = req.ward;
            // Handle by Quang Thanh resolve format from reverse-geocoding
            let district_id = "";
            let ward_id = "";
            // Process get district id and ward id
            const districtList = await DistrictService.getAll();
            districtList.forEach((district) => {
                if (
                    normalizeString(district.label) ===
                    normalizeString(districtLabelRadomData)
                ) {
                    district_id = district._id;
                }
            });
            if (district_id && district_id != "") {
                const wardList = await WardService.getAllByDistrictId(district_id);
                wardList.forEach((ward) => {
                    if (
                        normalizeString(ward.label) ===
                        normalizeString(wardLabelRadomData)
                    ) {
                        ward_id = ward._id;
                    }
                });
            }
            if (district_id && district_id != "") {
                data.district = district_id;
            }
            if (ward_id && ward_id != "") {
                data.ward = ward_id;
            }

            // End by Quang Thanh



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
