import { Ward } from '../models/WardModel.js'

const WardService = {
    async getAll(filter, projection) {
        try {
            const ward = await Ward.find(filter).select("-coordinates")
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
            const ward = new Ward(data);
            const savedWard = await ward.save();
            return savedWard;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const ward = await Ward.findById(id);
            return ward;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const updatedward = await Ward.findByIdAndUpdate(id, data, { new: true });
            return updatedward;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const deletedward = await Ward.findByIdAndDelete(id);
            return deletedward;
        } catch (error) {
            throw error;
        }
    }
}

export default WardService
