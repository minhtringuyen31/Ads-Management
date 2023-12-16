import { AdsBoard } from '../models/AdsBoardModel.js'
import mongoose from "mongoose";
const AdsBoardService = {
    async getAll(filter) {
        try {
            const adsBoard = await AdsBoard.aggregate([
                {
                    $lookup: {
                        from: "locations",
                        localField: "location_id",
                        foreignField: "_id",
                        as: "location"
                    }
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "adsboard_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "adsboardTypeInfor" // Tên trường kết quả sau khi join
                    }
                },
                {
                    $unwind: "$location"
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "location.ads_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "adsTypeInfo" // Tên trường kết quả sau khi join
                    }
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "location.location_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "locationInfo" // Tên trường kết quả sau khi join
                    }
                },
                {
                    $project: {
                        location: {
                            lat: "$location.coordinate.lat",
                            lng: "$location.coordinate.lng",
                            is_planned: "$location.is_planned",
                            image: "$location.image",

                            ads_type: { $arrayElemAt: ["$adsTypeInfo.label", 0] },
                            location_type: { $arrayElemAt: ["$locationInfo.label", 0] },

                        },
                        adsboard_type: { $arrayElemAt: ["$adsboardTypeInfor.label", 0] },
                        width: 1,
                        height: 1,
                        contract_end_date: 1,
                        contract_start_date: 1,
                        company_id: 1

                    }
                }
            ])
            return adsBoard;
        } catch (error) {
            throw error;
        }
    },
    async getAllAdBoardbyLocation(id) {
        try {
            const adsBoard = await AdsBoard.aggregate([
                {
                    $match: {
                        location_id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "location_id",
                        foreignField: "_id",
                        as: "location"
                    }
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "adsboard_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "adsboardTypeInfor" // Tên trường kết quả sau khi join
                    }
                },

                {
                    $unwind: "$location"
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "location.ads_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "adsTypeInfo" // Tên trường kết quả sau khi join
                    }
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "location.location_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "locationInfo" // Tên trường kết quả sau khi join
                    }
                },
                {
                    $project: {
                        location: {
                            lat: "$location.coordinate.lat",
                            lng: "$location.coordinate.lng",
                            is_planned: "$location.is_planned",
                            image: "$location.image",

                            ads_type: { $arrayElemAt: ["$adsTypeInfo.label", 0] },
                            location_type: { $arrayElemAt: ["$locationInfo.label", 0] },

                        },
                        adsboard_type: { $arrayElemAt: ["$adsboardTypeInfor.label", 0] },
                        width: 1,
                        height: 1,
                        contract_end_date: 1,
                        contract_start_date: 1

                    }
                }
            ])
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
