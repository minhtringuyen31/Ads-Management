import mongoose from "mongoose";
import { ProvinceOfficer, User, WardOfficer, DistrictOfficer } from "../models/UserModel.js";
const UserService = {
    async getAll(filter, projection) {
        try {
            const wardOfficers = await WardOfficer.find({ __t: 'WardOfficer' }).populate({
                path: "assigned_areaid",
                model: "Ward",
                select: "-coordinates",
                populate: {
                    path: "district",
                    model: "District",
                    select: "-coordinates",
                }
              }).lean().exec();
              console.log(wardOfficers)
              // Tìm các user có __t là 'DistrictOfficer'
              const districtOfficers = await DistrictOfficer.find({ __t: 'DistrictOfficer' }).populate({
                path: "assigned_areaid",
                model: "District",
                select: "-coordinates",
              }).lean().exec();
              console.log(districtOfficers)
              // Tìm các user có __t là 'ProvinceOfficer'
              const provinceOfficers = await ProvinceOfficer.find({ __t: 'ProvinceOfficer' })
              // Gộp các kết quả lại thành một mảng
              console.log(provinceOfficers)
              const allOfficers = [...wardOfficers, ...districtOfficers, ...provinceOfficers];
          
              return allOfficers;
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
                updatedUser = await DistrictOfficer.findOneAndUpdate({id: id}, {$set:data}, {new: true});
            }
            else if (user.__t === "WardOfficer") {
                updatedUser = await WardOfficer.findOneAndUpdate({id: id}, {$set:data}, {new: true});
            }
            else {
                updatedUser = await User.findOneAndUpdate({id: id}, {$set:data}, {new: true});
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
