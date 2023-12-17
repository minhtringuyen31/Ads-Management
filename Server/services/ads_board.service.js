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
            const adsBoard = await AdsBoard.findById(id);
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
