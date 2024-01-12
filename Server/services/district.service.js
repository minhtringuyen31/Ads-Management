import { District } from '../models/DistrictModel.js'
import { Ward } from '../models/WardModel.js';
import mongoose from "mongoose";
const DistrictService = {
    async getAll(filter, projection) {
        try {
            const district = await District.find(filter).select('-coordinates');
            return district;
        } catch (error) {
            throw error;
        }
    },
    async getWardsOfDistrict(districtId) {
        try {
            const ward = await Ward.find({ district: districtId }).select("-coordinates")
                .populate({
                    path: "district",
                    model: "District", // Replace with the actual name of the User model
                    select: "-coordinates",
                });
            return ward;
        } catch (error) {
            throw error;
        }
    },

    async create(data) {
        try {
            const district = new District(data);
            const districtSave = await district.save();
            return districtSave;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const district = await District.findById(id);
            return district;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const dictrict = await District.findByIdAndUpdate(id, data, { new: true });
            return dictrict;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const dictrict = await District.findByIdAndDelete(id);
            return dictrict;
        } catch (error) {
            throw error;
        }
    }
}

export default DistrictService
