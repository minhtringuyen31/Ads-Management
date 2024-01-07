import { NotificationModel } from '../models/NotificationModel.js'

const NotificationService = {
    async getAll(filter, projection) {
        try {
            const locationType = await NotificationModel.find(filter).select(projection);
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
