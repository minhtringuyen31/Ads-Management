
import mongoose from "mongoose";
import { ProvinceOfficer, User, WardOfficer, DistrictOfficer } from "../models/UserModel.js";
const CompanyServices = {
    async getAll(filter, projection) {
        try {
            const user = await User.find(filter).select(projection);
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
            const user = await User.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const user = await User.findByIdAndUpdate(id, data, { new: true });
            return user;
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
    }
}

export default CompanyServices
