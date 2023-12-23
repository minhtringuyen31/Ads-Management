
import mongoose from "mongoose";
import { Company } from "../models/CompanyModel.js";
const CompanyServices = {
    async getAll(filter, projection) {
        try {
            const company = await Company.find(filter).select(projection);
            return company;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const company = new Company(data);
            const companySave = await company.save();
            return companySave;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const company = await Company.findById(id);
            return company;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const company = await Company.findByIdAndUpdate(id, data, { new: true });
            return company;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const company = await Company.findByIdAndDelete(id);
            return company;
        } catch (error) {
            throw error;
        }
    }
}

export default CompanyServices
