import { Location } from '../models/LocationModel.js'
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const LocationService = {
    async getAll(filter, projection) {
        try {
            const locations = await Location.aggregate([
                {
                    $lookup: {
                        from: "wards", // Tên của collection Ward
                        localField: "ward_id", // Trường trong Location dùng để ghép nối
                        foreignField: "_id", // Trường trong Ward dùng để ghép nối
                        as: "wardInfo" // Tên cho trường mới sau khi ghép nối
                    }
                },
                {
                    $lookup: {
                        from: "districts", // Tên của collection District
                        localField: "wardInfo.district_id", // Trường trong Location dùng để ghép nối
                        foreignField: "_id", // Trường trong District dùng để ghép nối
                        as: "districtInfo" // Tên cho trường mới sau khi ghép nối
                    }
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "ads_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "adsTypeInfo" // Tên trường kết quả sau khi join
                    }
                },
                {
                    $lookup: {
                        from: "types", // Tên collection của AdsType trong MongoDB
                        localField: "location_type", // Trường trong Location để join
                        foreignField: "key", // Trường trong AdsType để join
                        as: "locationInfo" // Tên trường kết quả sau khi join
                    }
                },
                {
                    $project: {
                        coordinate: 1,
                        ward: { $arrayElemAt: ["$wardInfo.label", 0] }, // Chọn trường label từ collection Ward
                        district: { $arrayElemAt: ["$districtInfo.label", 0] },// Chọn trường label từ collection Ward
                        ads_type: { $arrayElemAt: ["$adsTypeInfo.label", 0] },
                        location_type: { $arrayElemAt: ["$locationInfo.label", 0] },
                        image: 1,
                        is_planned: 1,
                    }
                },

            ]);
            return locations;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const location = new Location(data);
            const savedLocation = await location.save();

            return savedLocation;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const location = await Location.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: "wards", // Tên của collection Ward
                        localField: "ward_id", // Trường trong Location dùng để ghép nối
                        foreignField: "_id", // Trường trong Ward dùng để ghép nối
                        as: "wardInfo" // Tên cho trường mới sau khi ghép nối
                    }
                },
                {
                    $lookup: {
                        from: "districts", // Tên của collection District
                        localField: "wardInfo.district_id", // Trường trong Location dùng để ghép nối
                        foreignField: "_id", // Trường trong District dùng để ghép nối
                        as: "districtInfo" // Tên cho trường mới sau khi ghép nối
                    }
                },
                {
                    $project: {
                        coordinate: 1,
                        ward_label: { $arrayElemAt: ["$wardInfo.label", 0] }, // Chọn trường label từ collection Ward
                        district_label: { $arrayElemAt: ["$districtInfo.label", 0] },// Chọn trường label từ collection Ward
                        ads_type: 1,
                        location_type: 1,
                        image: 1

                    }
                }
            ]);
            return location;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const updatedLocation = await Location.findByIdAndUpdate(id, data, { new: true });
            return updatedLocation;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const deletedLocation = await Location.findByIdAndDelete(id);
            return deletedLocation;
        } catch (error) {
            throw error;
        }
    },
    // Add by Quang Thanh on 07.12.2023 to heath check API 
    async healthCheck() {
        try {

            // Add by Quang Thanh on 07.12.2023 to update all document in collection

            // Điều kiện để cập nhật toàn bộ tài liệu (rỗng để áp dụng cho tất cả)
            // const filter = {};
            // // Cập nhật dữ liệu mới ở đây
            // const update = {
            //     // Đặt các trường mới cho tài liệu
            //     // Ví dụ:
            //     image: ['https://quangcaongoaitroi.com/wp-content/uploads/2019/08/quang-cao-ngoai-troi-tai-nga-6-phu-dong-11.jpg', 'https://quangcaongoaitroi.com/wp-content/uploads/2020/04/man-hinh-led-quang-cao-2-nguyen-trai-vong-xoay-phu-dong-4.jpg'],
            // };

            // // Sử dụng phương thức updateMany() để cập nhật
            // const result = await Location.updateMany({}, { ads_type_id: "political_propaganda" })

            // Add by Quang Thanh on 07.12.2023 to rename all document in collection
            const result = await Location.updateMany({}, { $rename: { "location_type_id": "location_type" } });
            console.log("!23");

            return result;
        } catch (error) {
            throw error;
        }
    }
    // End by Quang Thanh


}

export default LocationService
