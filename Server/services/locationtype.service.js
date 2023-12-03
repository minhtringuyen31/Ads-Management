import { LocationType } from '../models/TypeModel.js'

const LocationTypeService = {
    async getAll(filter, projection) {
        try {
            const locationType = await LocationType.find(filter).select(projection);
            return locationType;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const locationType = new LocationType(data);
            const savedLocation = await locationType.save();
            return savedLocation;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const locationType = await LocationType.findById(id);
            return locationType;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const updatedLocationType = await LocationType.findByIdAndUpdate(id, data, { new: true });
            return updatedLocationType;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const deletedLocationType = await LocationType.findByIdAndDelete(id);
            return deletedLocationType;
        } catch (error) {
            throw error;
        }
    }
}

export default LocationTypeService
