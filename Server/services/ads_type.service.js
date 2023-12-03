import { AdsType } from '../models/TypeModel.js'

const AdsTypeService = {
    async getAll(filter, projection) {
        try {
            const adstype = await AdsType.find(filter).select(projection);
            return adstype;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const adstype = new AdsType(data);
            const savedAdstype = await adstype.save();
            return savedAdstype;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const adstype = await AdsType.findById(id);
            return adstype;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const adstype = await AdsType.findByIdAndUpdate(id, data, { new: true });
            return adstype;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const adstype = await AdsType.findByIdAndDelete(id);
            return adstype;
        } catch (error) {
            throw error;
        }
    }
}

export default AdsTypeService
