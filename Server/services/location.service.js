import { Location } from '../models/LocationModel.js'

const LocationService = {
    async getAll(filter, projection) {
        try {
            const locations = await Location.find(filter).select(projection);
            return locations;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const location = new Location(data);
            const savedLocation = await location.save();
            return savedLocation;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const location = await Location.findById(id);
            return location;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const updatedLocation = await Location.findByIdAndUpdate(id, data, { new: true });
            return updatedLocation;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const deletedLocation = await Location.findByIdAndDelete(id);
            return deletedLocation;
        } catch (error) {
            throw error;
        }
    }
}

export default LocationService
