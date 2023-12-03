import { Location } from '../models/LocationModel.js'

const LocationService = {
    async getAllLocation(filter, projection) {
        return await Location.find(filter).select(projection);
    },

}

export default LocationService
