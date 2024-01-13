import { EditRequest } from "../models/EditRequestModel.js";

const EditRequestService = {
  async getAll(filter, projection) {
    return await EditRequest.find(filter).select(projection).populate({
      path: "newInformation.ward",
      model: "Ward", // Replace with the actual name of the Location model
      select: "label",
    })
      .populate({
        path: "newInformation.district",
        model: "District", // Replace with the actual name of the Location model
        select: "label"
      })
      .populate({
        path: "newInformation.location_type",
        model: "Type", // Replace with the actual name of the Location model
        select: "label -__t"
      }).
      populate({
        path: "newInformation.ads_type",
        model: "Type", // Replace with the actual name of the Location model
        select: "label -__t"
      }).populate({
        path: "newInformation.adsboard_type",
        model: "Type", // Replace with the actual name of the Location model
        select: "label -__t"
      })
      .populate({
        path: "newInformation.location",
        model: "Location", // Replace with the actual name of the Location model
        populate: [{
          path: "location_type",
          model: "Type", // Replace with the actual name of the Location model
          select: "label -__t"
        }, {
          path: "ward",
          model: "Ward", // Replace with the actual name of the Location model
          select: "label"
        }, {
          path: "ads_type",
          model: "Type", // Replace with the actual name of the Location model
          select: "label"
        }, {
          path: "district",
          model: "District", // Replace with the actual name of the Location model
          select: "label"
        }],
      }).populate({
        path: "newInformation.location",
        model: "Location", // Replace with the actual name of the Location model
        populate: [{
          path: "location_type",
          model: "Type", // Replace with the actual name of the Location model
          select: "label -__t"
        }, {
          path: "ward",
          model: "Ward", // Replace with the actual name of the Location model
          select: "label"
        }, {
          path: "ads_type",
          model: "Type", // Replace with the actual name of the Location model
          select: "label"
        }, {
          path: "district",
          model: "District", // Replace with the a ctual name of the Location model
          select: "label"
        }],
      }).populate({
        path: "newInformation.company",
        model: "Company", // Replace with the actual name of the Location model
      })
      .exec();
  },
  // async getAll() {
  //   return await EditRequest.find();
  // },

  async getById(id) {
    return await EditRequest.findById(id).populate({
      path: "newInformation.ward",
      model: "Ward", // Replace with the actual name of the Location model
      select: "label",
    })
      .populate({
        path: "newInformation.district",
        model: "District", // Replace with the actual name of the Location model
        select: "label"
      })
      .populate({
        path: "newInformation.location_type",
        model: "Type", // Replace with the actual name of the Location model
        select: "label -__t"
      }).
      populate({
        path: "newInformation.ads_type",
        model: "Type", // Replace with the actual name of the Location model
        select: "label -__t"
      }).populate({
        path: "newInformation.adsboard_type",
        model: "Type", // Replace with the actual name of the Location model
        select: "label -__t"
      })
      .populate({
        path: "newInformation.location",
        model: "Location", // Replace with the actual name of the Location model
        populate: [{
          path: "location_type",
          model: "Type", // Replace with the actual name of the Location model
          select: "label -__t"
        }, {
          path: "ward",
          model: "Ward", // Replace with the actual name of the Location model
          select: "label"
        }, {
          path: "ads_type",
          model: "Type", // Replace with the actual name of the Location model
          select: "label"
        }, {
          path: "district",
          model: "District", // Replace with the actual name of the Location model
          select: "label"
        }],
      }).populate({
        path: "newInformation.company",
        model: "Company", // Replace with the actual name of the Location model
      });
  },

  async create(objectData) {
    const newObject = new EditRequest(objectData);
    return await newObject.save();
  },

  async update(id, updateData) {
    return await EditRequest.findByIdAndUpdate(id, updateData, { new: true });
  },

  async delete(id) {
    return await EditRequest.findByIdAndDelete(id);
  }
};

export default EditRequestService;
