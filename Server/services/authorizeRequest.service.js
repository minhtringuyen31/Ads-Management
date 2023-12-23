import { AuthorizeRequest } from "../models/AuthorizeRequestModel.js";

const AuthorizeRequestService = {
  async getAll(filter, projection) {
    return await AuthorizeRequest.find(filter).select(projection)
      .populate({
        path: "new_ads_board", // Đường dẫn đến adsboard_type trong new_ads_board
        model: "AdsBoard", // Thay thế bằng tên thực tế của mô hình Type
        populate: [{
          path: "location",
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
          },

          ],
        }, {
          path: "adsboard_type",
          model: "Type", // Replace with the actual name of the Location model
          select: "label -__t"
        }],
      })
      .exec();
  },

  async getById(id) {
    return await AuthorizeRequest.findById(id);
  },

  async create(objectData) {
    const newObject = new AuthorizeRequest(objectData);
    return await newObject.save();
  },

  async update(id, updateData) {
    return await AuthorizeRequest.findByIdAndUpdate(id, updateData, { new: true });
  },

  async delete(id) {
    return await AuthorizeRequest.findByIdAndDelete(id);
  }
};

export default AuthorizeRequestService;
