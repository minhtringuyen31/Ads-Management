import { NotificationModel } from '../models/NotificationModel.js'

const NotificationService = {
    async getAll(filter, projection) {
        try {
            const locationType = await NotificationModel.find(filter).populate({
                path: "content.location",
                model: "Location",
                populate: [
                    {
                        path: "ward",
                        model: "Ward",
                        select: "-coordinates -__v",
                    },
                    {
                        path: "district",
                        model: "District", // Thay thế bằng tên thực tế của mô hình District
                        select: "-coordinates -__v -ward_ids",
                    },
                    {
                        path: "location_type",
                        model: "LocationType", // Thay thế bằng tên thực tế của mô hình LocationType
                        select: "-__t -__v ",
                    },
                    {
                        path: "ads_type",
                        model: "AdsType", // Thay thế bằng tên thực tế của mô hình AdsType
                        select: "-__t -__v ",
                    },
                ],
            })
                .populate({
                    path: "content.report_form",
                    model: "ReportType",
                    select: "-__t -__v",
                })
                .populate({
                    path: "content.board",
                    model: "AdsBoard", // Replace with the actual name of the Board model
                    populate: [{
                        path: "location",
                        model: "Location", // Replace with the actual name of the Location model
                        populate: [
                            {
                                path: "ward",
                                model: "Ward", // Replace with the actual name of the Location model
                                select: "-coordinates -__v",
                            },
                            {
                                path: "district",
                                model: "District", // Replace with the actual name of the Location model
                                select: "-coordinates -__v -ward_ids",
                            },
                            {
                                path: "location_type",
                                model: "LocationType", // Thay thế bằng tên thực tế của mô hình LocationType
                                select: "-__t -__v ",
                            },
                            {
                                path: "ads_type",
                                model: "AdsType", // Thay thế bằng tên thực tế của mô hình AdsType
                                select: "-__t -__v ",
                            },
                        ],
                    },
                    {
                        path: "adsboard_type",
                        model: "AdsBoardType", // Replace with the actual name of the Location model
                    },
                    ],
                })
                .populate({
                    path: "content.operation.user",
                    model: "User", // Replace with the actual name of the User model
                    select: "-password",
                }).populate({
                    path: "content.ward",
                    model: "Ward", // Replace with the actual name of the Location model
                    select: "label",
                }).populate({
                    path: "content.district",
                    model: "District", // Replace with the actual name of the Location model
                    select: "label",
                }).lean().exec();
            return locationType;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const locationType = new NotificationModel(data);
            const savedLocation = await locationType.save();
            return savedLocation;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const locationType = await NotificationModel.findById(id);
            return locationType;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const updatedLocationType = await NotificationModel.findByIdAndUpdate(id, data, { new: true });
            return updatedLocationType;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const deletedLocationType = await NotificationModel.findByIdAndDelete(id);
            return deletedLocationType;
        } catch (error) {
            throw error;
        }
    }
}

export default NotificationService
