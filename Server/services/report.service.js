import { Report } from "../models/ReportModel.js";

const ReportService = {
  async getAll(filter, projection) {
    try {
      const reports = await Report.find({})
        .populate({
          path: "location",
          model: "Location", // Replace with the actual name of the Location model
          populate: {
            path: "ward",
            model: "Ward", // Replace with the actual name of the Location model
            select: "-coordinates -__v",
            populate: {
              path: "district",
              model: "District", // Replace with the actual name of the Location model
              select: "-coordinates -__v -ward_ids",
            },
          },
        })
        .populate({
          path: "board",
          model: "AdsBoard", // Replace with the actual name of the Board model
          populate: {
            path: "location",
            model: "Location", // Replace with the actual name of the Location model
            populate: {
              path: "ward",
              model: "Ward", // Replace with the actual name of the Location model
              select: "-coordinates -__v",
              populate: {
                path: "district",
                model: "District", // Replace with the actual name of the Location model
                select: "-coordinates -__v -ward_ids",
              },
            },
          },
        })
        .populate({
          path: "operation.userId",
          model: "User", // Replace with the actual name of the User model
          select: "-password",
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
