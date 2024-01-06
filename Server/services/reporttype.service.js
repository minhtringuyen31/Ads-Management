import { ReportType } from '../models/TypeModel.js'

const ReportTypeService = {
    async getAll(filter, projection) {
        try {
            const reporttype = await ReportType.find(filter).select(projection);
            return reporttype;
        } catch (error) {
            throw error;
        }
    },
    async create(data) {
        try {
            const reporttype = new ReportType(data);
            const savedReporttype = await reporttype.save();
            return savedReporttype;
        } catch (error) {
            throw error;
        }
    },
    async getById(id) {
        try {
            const reporttype = await ReportType.findById(id);
            return reporttype;
        } catch (error) {
            throw error;
        }
    },
    async update(id, data) {
        try {
            const reporttype = await ReportType.findByIdAndUpdate(id, data, { new: true });
            return reporttype;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const reporttype = await ReportType.findByIdAndDelete(id);
            return reporttype;
        } catch (error) {
            throw error;
        }
    }
}

export default ReportTypeService
