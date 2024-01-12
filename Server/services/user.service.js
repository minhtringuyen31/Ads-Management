import mongoose from "mongoose";
import { ProvinceOfficer, User, WardOfficer, DistrictOfficer } from "../models/UserModel.js";
const UserService = {
    async getAll(filter, projection) {
        try {
            const user = await User.find(filter).populate({
                path: "assigned_areaid",
                model: "Ward", // Replace with the actual name of the Location model
                select: "-coordinates",
            }).populate({
                path: "assigned_areaid",
                model: "District", // Replace with the actual name of the Location model
                select: "-coordinates",
            }).lean().exec();
            return user;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            var user;
            if (data.userRole == 'province_officer') {
                const admin = new ProvinceOfficer(data);
                user = await admin.save();
            } else if (data.userRole == "ward_officer") {
                const wardOfficer = new WardOfficer(data);
                user = await wardOfficer.save();
            }
            else if (data.userRole == "district_officer") {
                const districtor = new DistrictOfficer(data);
                user = await districtor.save();
            } else {
                const anonymous = new User(data);
                user = await anonymous.save();
            }
            const userSave = await user.save();
            return userSave;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            let user = await User.findById(id);
            if (user.__t === "DistrictOfficer") {
                user = await DistrictOfficer.findById(id).populate({
                    path: "assigned_areaid",
                    model: "District", // Replace with the actual name of the Location model
                }).lean().exec();
            }
            else if (user.__t === "WardOfficer") {
                user = await WardOfficer.findById(id).populate({
                    path: "assigned_areaid",
                    model: "Ward", // Replace with the actual name of the Location model
                    select: "-coordinates",
                    populate: {
                        path: "district",
                        model: "District", // Replace with the actual name of the Location model
                    },
                }).lean().exec();;
            }
            else {
                user = await User.findById(id);
            }
            return user;
        } catch (error) {
            throw error;
        }
    },
    async getByEmail(email) {
        try {
            const user = await User.findOne({ email: email })
            return user;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const user = await User.findById(id);
            let updatedUser;
            if (user.__t === "DistrictOfficer") {
                updatedUser = await DistrictOfficer.findByIdAndUpdate(id, data);
            }
            else if (user.__t === "WardOfficer") {
                updatedUser = await WardOfficer.findByIdAndUpdate(id, data);
            }
            else {
                updatedUser = await User.findByIdAndUpdate(id, data);
            }

            return updatedUser;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            return user;
        } catch (error) {
            throw error;
        }
    },
};

export default UserService;
