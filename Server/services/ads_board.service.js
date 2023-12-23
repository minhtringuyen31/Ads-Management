import { AdsBoard } from '../models/AdsBoardModel.js'
import mongoose from "mongoose";
const AdsBoardService = {
    async getAll(filter) {
        try {
            const adsBoard = await AdsBoard.find({})
                .populate({
                    path: "adsboard_type",
                    model: "Type", // Replace with the actual name of the Location model
                    select: "label -__t"
                })
                .populate({
                    path: "location",
                    model: "Location", // Replace with the actual name of the Location model
                    populate: [{
                        path: "location_type",
                        model: "Type", // Replace with the actual name of the Location model
                        select: "label -__t"
                    }, {
                        path: "ward",
                        model: "Ward", // Replace with the actual name of the Location model
                        select: "label"
                    }, {
                        path: "ads_type",
                        model: "Type", // Replace with the actual name of the Location model
                        select: "label"
                    }, {
                        path: "district",
                        model: "District", // Replace with the actual name of the Location model
                        select: "label"
                    }],
                }).populate({
                    path: "company",
                    model: "Company", // Replace with the actual name of the Location model
                })
                .exec();
            return adsBoard;
        } catch (error) {
            throw error;
        }
    },
    async getAllAdBoardbyLocation(id) {
        try {
            const adsBoard = await AdsBoard.find({})
                .populate({
                    path: "adsboard_type",
                    model: "Type", // Replace with the actual name of the Location model
                    select: "label -__t"
                }).populate({
                    path: "location",
                    model: "Location", // Replace with the actual name of the Location model
                    populate: [{
                        path: "location_type",
                        model: "Type", // Replace with the actual name of the Location model
                        select: "label -__t"
                    }, {
                        path: "ward",
                        model: "Ward", // Replace with the actual name of the Location model
                        select: "label"
                    }, {
                        path: "ads_type",
                        model: "Type", // Replace with the actual name of the Location model
                        select: "label"
                    }, {
                        path: "district",
                        model: "District", // Replace with the actual name of the Location model
                        select: "label"
                    }],

                }).populate({
                    path: "company",
                    model: "Company", // Replace with the actual name of the Location model
                })
                .exec();
            return adsBoard;
        } catch (error) {
            throw error;
        }

    },
    async create(data) {
        try {
            const adsBoard = new AdsBoard(data);
            const savedAdsBoard = await adsBoard.save();
            return savedAdsBoard;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const adsBoard = await AdsBoard.findById(id).populate({
                path: "adsboard_type",
                model: "Type", // Replace with the actual name of the Location model
                select: "label -__t"
            }).populate({
                path: "location",
                model: "Location", // Replace with the actual name of the Location model
                populate: [{
                    path: "location_type",
                    model: "Type", // Replace with the actual name of the Location model
                    select: "label -__t"
                }, {
                    path: "ward",
                    model: "Ward", // Replace with the actual name of the Location model
                    select: "label"
                }, {
                    path: "ads_type",
                    model: "Type", // Replace with the actual name of the Location model
                    select: "label"
                }, {
                    path: "district",
                    model: "District", // Replace with the actual name of the Location model
                    select: "label"
                }],
            }).populate({
                path: "company",
                model: "Company", // Replace with the actual name of the Location model
            });
            return adsBoard;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const adsBoard = await AdsBoard.findByIdAndUpdate(id, data, { new: true });
            return adsBoard;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const adsBoard = await AdsBoard.findByIdAndDelete(id);
            return adsBoard;
        } catch (error) {
            throw error;
        }
    }
}

export default AdsBoardService
