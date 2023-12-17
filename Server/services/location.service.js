import { AdsBoard } from '../models/AdsBoardModel.js';
import { District } from '../models/DistrictModel.js';
import { Location } from '../models/LocationModel.js'
import mongoose from "mongoose";
import { Ward } from '../models/WardModel.js';
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
                    $lookup: {
                        from: "adsboards", // Tên của collection AdsBoard
                        localField: "_id", // Trường trong Location dùng để ghép nối
                        foreignField: "location_id", // Trường trong AdsBoard dùng để ghép nối
                        pipeline: [
                            {
                                $lookup: {
                                    from: "types", // Sử dụng collection types
                                    localField: "adsboard_type", // Trường trong adsboard để nối
                                    foreignField: "key", // Trường trong types để nối
                                    as: "adsboardTypeInfo" // Kết quả sau khi nối
                                }
                            },
                            {
                                $unwind: "$adsboardTypeInfo" // Phẳng hóa kết quả nối
                            },
                            {
                                $addFields: {
                                    "adsboard_type": "$adsboardTypeInfo.label" // Thêm nhãn vào adsboard
                                }
                            },
                            {
                                $project: {
                                    adsboardTypeInfo: 0, // Loại bỏ trường adsboardTypeInfo
                                    location_id: 0,

                                    // Bạn cần liệt kê tất cả các trường khác mà bạn muốn giữ lại ở đây
                                }
                            }
                        ],
                        as: "adsboard" // Tên cho trường mới sau khi ghép nối
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
                        adsboard: 1,// Thêm trường adsboards vào kết quả
                        is_planned: 1,
                    }
                },
            ]);

            return location[0] || null;
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
            const result = await Ward.updateMany({}, {
                coordinates: [[
                    106.6872118,
                    10.7712513
                ],
                [
                    106.6879196,
                    10.7706327
                ],
                [
                    106.6883584,
                    10.7701975
                ],
                [
                    106.6886058,
                    10.7699499
                ],
                [
                    106.6891202,
                    10.7693866
                ],
                [
                    106.6896694,
                    10.7687581
                ],
                [
                    106.6899547,
                    10.7684301
                ],
                [
                    106.6962428,
                    10.7709486
                ],
                [
                    106.6966548,
                    10.7710746
                ],
                [
                    106.6978388,
                    10.7715958
                ],
                [
                    106.6984882,
                    10.7712931
                ],
                [
                    106.6990438,
                    10.7710765
                ],
                [
                    106.6999715,
                    10.7710277
                ],
                [
                    106.700967,
                    10.7709734
                ],
                [
                    106.7011507,
                    10.7709803
                ],
                [
                    106.7011208,
                    10.7710504
                ],
                [
                    106.7010745,
                    10.7711589
                ],
                [
                    106.701034,
                    10.7712462
                ],
                [
                    106.7007933,
                    10.7718253
                ],
                [
                    106.7006181,
                    10.7722012
                ],
                [
                    106.7005338,
                    10.7724025
                ],
                [
                    106.7004972,
                    10.7724901
                ],
                [
                    106.7003159,
                    10.7729233
                ],
                [
                    106.7001731,
                    10.7732378
                ],
                [
                    106.7001344,
                    10.7733104
                ],
                [
                    106.7000839,
                    10.7734185
                ],
                [
                    106.7000424,
                    10.7735011
                ],
                [
                    106.6999951,
                    10.7736039
                ],
                [
                    106.6995506,
                    10.774706
                ],
                [
                    106.6990906,
                    10.7757646
                ],
                [
                    106.6990847,
                    10.7757787
                ],
                [
                    106.6990413,
                    10.7758572
                ],
                [
                    106.6984775,
                    10.7763501
                ],
                [
                    106.6984143,
                    10.7764036
                ],
                [
                    106.6980163,
                    10.7767856
                ],
                [
                    106.6972746,
                    10.7774709
                ],
                [
                    106.6970183,
                    10.7777077
                ],
                [
                    106.6964711,
                    10.7782204
                ],
                [
                    106.6963723,
                    10.7783104
                ],
                [
                    106.6959232,
                    10.7787097
                ],
                [
                    106.6958495,
                    10.7787741
                ],
                [
                    106.6953177,
                    10.7792387
                ],
                [
                    106.6949544,
                    10.7795562
                ],
                [
                    106.6930056,
                    10.7774171
                ],
                [
                    106.6917156,
                    10.7760091
                ],
                [
                    106.6916489,
                    10.775968
                ],
                [
                    106.6894253,
                    10.7736121
                ],
                [
                    106.6872118,
                    10.7712513
                ]]
            })

            // Add by Quang Thanh on 07.12.2023 to rename all document in collection
            // const result = await Location.updateMany({}, { $rename: { "location_type_id": "location_type" } });
            console.log("!23");

            return result;
        } catch (error) {
            throw error;
        }
    }
    // End by Quang Thanh


}

export default LocationService
