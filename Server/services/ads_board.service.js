import { AdsBoard } from '../models/AdsBoardModel.js'

const AdsBoardService = {
    async getAll(filter, projection) {
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
                    $unwind: "$location"
                }, {
                    $project: {
                        location: {
                            lat: "$location.coordinate.lat",
                            lng: "$location.coordinate.lng",
                            is_planned: "$location.is_planned",
                            image: "$location.image",
                            ads_type: "$location.ads_type",
                            location_type: "$location.location_type"
                        },
                        adsboard_type: 1,
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
