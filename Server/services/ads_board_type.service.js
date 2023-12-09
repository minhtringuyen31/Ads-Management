import { AdsBoardType } from '../models/TypeModel.js'

const AdsBoardTypeService = {
    async getAll(filter, projection) {
        try {
            const adsBoardType = await AdsBoardType.find(filter).select(projection);
            return adsBoardType;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const adsBoardType = new AdsBoardType(data);
            const savedadsBoardType = await adsBoardType.save();
            return savedadsBoardType;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const adsBoardType = await AdsBoardType.findById(id);
            return adsBoardType;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const adsBoardType = await AdsBoardType.findByIdAndUpdate(id, data, { new: true });
            return adsBoardType;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const adsBoardType = await AdsBoardType.findByIdAndDelete(id);
            return adsBoardType;
        } catch (error) {
            throw error;
        }
    }
}

export default AdsBoardTypeService
