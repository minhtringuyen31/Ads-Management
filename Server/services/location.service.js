import { AdsBoard } from '../models/AdsBoardModel.js';
import { District } from '../models/DistrictModel.js';
import { Report } from '../models/ReportModel.js';
import { Location } from '../models/LocationModel.js'
import mongoose from "mongoose";
import { Ward } from '../models/WardModel.js';
const ObjectId = mongoose.Types.ObjectId;

const LocationService = {
    async getAll(filter, sort) {
        try {
            const locations = await Location.find({})
                .populate({
                    path: "ward",
                    model: "Ward", // Replace with the actual name of the Location model
                    select: "label",
                })
                .populate({
                    path: "district",
                    model: "District", // Replace with the actual name of the Location model
                    select: "label"
                })
                .populate({
                    path: "location_type",
                    model: "Type", // Replace with the actual name of the Location model
                    select: "label -__t"
                }).
                populate({
                    path: "ads_type",
                    model: "Type", // Replace with the actual name of the Location model
                    select: "label -__t"
                })
                .exec();
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

            var location = await Location.findOne({ _id: new ObjectId(id) })
                .populate({
                    path: 'ward',
                    model: 'Ward',
                    select: 'label -_id' // Select only the label field and exclude the _id
                })
                .populate({
                    path: "district",
                    model: "District", // Replace with the actual name of the Location model
                    select: "label"
                })
                .populate({
                    path: 'ads_type',
                    model: 'Type', // Replace with the actual name of the AdsType model
                    select: 'label -_id -__t' // Select only the label field and exclude the _id
                })
                .populate({
                    path: 'location_type',
                    model: 'Type', // Replace with the actual name of the LocationType model
                    select: 'label -_id -__t' // Select only the label field and exclude the _id
                }).exec();


            const adsboards = await AdsBoard.find({ location: new ObjectId(location._id) })
                .populate({
                    path: "adsboard_type",
                    model: "Type", // Replace with the actual name of the Location model
                    select: "label -__t"
                }).
                populate(
                    {
                        path: "company",
                        model: "Company", // Replace with the actual name of the Location model
                    }
                ).
                populate({
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
                    },
                        // 

                    ],
                })
                .exec();

            // Now combine the adsboards with the location
            if (location) {
                location = location.toObject(); // Convert the mongoose document to a plain object if necessary
                location.adsboards = adsboards; // Add the adsboards array to the location object
            }

            return location || null;
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
            const result = await Report.updateMany({}, {
                report_form: '659956539ca7ece247bb954c'
            });

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
