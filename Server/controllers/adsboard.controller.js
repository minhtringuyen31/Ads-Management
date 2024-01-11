import createError from "http-errors";
import AdsBoardService from "../services/ads_board.service.js";
import { extractPublicId } from 'cloudinary-build-url'
import { v2 as cloudinary } from 'cloudinary';

const AdsBoardController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const users = await AdsBoardService.getAll(filter);
            if (!users) {
                return next(createError.BadRequest("AdsBoard list not found"))
            }
            res.json({
                message: "Get AdsBoard list successfully",
                status: 200,
                data: users
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    },
    getAllAdBoardByLocation: async (req, res, next) => {
        try {
            const id = req.params.id
            const users = await AdsBoardService.getAllAdBoardbyLocation(id);
            if (!users) {
                return next(createError.BadRequest("AdsBoard list not found"))
            }
            res.json({
                message: "Get AdsBoard list successfully",
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

            const files = req.files;
            if (files) {
                data.image = files.map(file => file.path);
            }
            const location = await AdsBoardService.create(data);
            if (!location) {
                if (req.files) {
                    req.files.forEach(file => {
                        cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                            console.log(result, error);
                        });
                    });
                }
                return next(createError.BadRequest("AdsBoard not found"))
            }
            res.json({
                message: "Create AdsBoard successfully",
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

            const data = req.body
            const { id } = req.params;
            const files = req.files;
            if (files) {
                data.image = files.map(file => file.path);
            }
            const location = await AdsBoardService.update(id, data);
            if (!location) {
                if (req.files) {
                    req.files.forEach(file => {
                        cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                            console.log(result, error);
                        });
                    });
                }
                return next(createError.BadRequest("AdsBoard not found"))
            }
            res.json({
                message: "Update AdsBoard successfully",
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
    getDetail: async (req, res, next) => {
        try {
            const { id } = req.params;
            const location = await AdsBoardService.getById(id);
            if (!location) {
                return next(createError.BadRequest("Record not found"))
            }
            res.json({
                message: "Get detail AdsBoard successfully",
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
            const location = await AdsBoardService.delete(id);
            if (!location) {
                return next(createError.BadRequest("AdsBoard not found"))
            }
            res.json({
                message: "Delete AdsBoard successfully",
                status: 200,
                data: location
            })
        } catch (error) {
            next(createError.InternalServerError(error.message))
        }

    }
};

export default AdsBoardController;
