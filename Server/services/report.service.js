import { Report } from "../models/ReportModel.js";

const ReportService = {
  async getAll(filter, projection) {
    try {
      const reports = await Report.find({})
        .populate({
          path: "location",
          model: "Location", // Replace with the actual name of the Location model
        })
        .populate({
          path: "board",
          model: "AdsBoard", // Replace with the actual name of the Board model
          populate: {
            path: "location_id",
            model: "Location", // Replace with the actual name of the Location model
          },
        })
        .exec();
  
      return reports;
    } catch (error) {
      console.error("Error getting reports:", error);
      throw error;
    }
  },
  // async getAll() {
  //   return await Report.find();
  // },

  async getById(id) {
    return await Report.findById(id);
  },

  async create(objectData) {
    const newObject = new Report(objectData);
    return await newObject.save();
  },

  async update(id, updateData) {
    return await Report.findByIdAndUpdate(id, updateData, { new: true });
  },

  async delete(id) {
    return await Report.findByIdAndDelete(id);
  },
};

export default ReportService;
