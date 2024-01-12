import createError from "http-errors";
import AdsBoardService from "../services/ads_board.service.js";
import CompanyService from "../services/company.service.js";
import UserService from "../services/user.service.js";
import { extractPublicId } from 'cloudinary-build-url'
import { v2 as cloudinary } from 'cloudinary';

const AdsBoardController = {
    getAll: async (req, res, next) => {
        try {
            const filter = req.body
            const ads = await AdsBoardService.getAll(filter);
            if (!ads) {
                return next(createError.BadRequest("AdsBoard list not found"))
            }
            
            let filteredLists = ads;
            const user = await UserService.getById(req.user.userId);
            //console.log("user", user)
            if(!user.assigned_areaid && user.__t !== "ProvinceOfficer"){
                res.status(400).json({message: "bạn éo có quyền"})
            }
            console.log("user", user)
            if (user.__t === "WardOfficer") {
                const assigned_areaid = user.assigned_areaid._id.toString();
                filteredLists = ads.filter(
                (ad) => ad.location.ward._id.toString() === assigned_areaid
                );
            } else if (user.__t === "DistrictOfficer") {
                console.log("ok")
                const assigned_areaid = user.assigned_areaid._id.toString();
                filteredLists = ads.filter(
                (ad) => ad.location.district._id.toString() === assigned_areaid
                );
            }
            res.json({
                message: "Get AdsBoard list successfully",
                status: 200,
                size_all: ads.length,
                size: filteredLists.length,
                data: filteredLists
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
            const companySave = await CompanyService.create(data.company);
            data.company = companySave._id;
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
