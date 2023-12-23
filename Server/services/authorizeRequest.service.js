import { AuthorizeRequest } from "../models/AuthorizeRequestModel.js";

const AuthorizeRequestService = {
  async getAll(filter, projection) {
    return await AuthorizeRequest.find(filter).select(projection)
      .populate({
        path: "new_ads_board.location", // Đường dẫn đến location trong new_ads_board
        model: "Location", // Thay thế bằng tên thực tế của mô hình Location
        select: "-__v"
      })
      .populate({
        path: "new_ads_board.adsboard_type", // Đường dẫn đến adsboard_type trong new_ads_board
        model: "Type", // Thay thế bằng tên thực tế của mô hình Type
        select: "label -__v"
      }).populate({
        path: "new_ads_board.adsboard_type", // Đường dẫn đến adsboard_type trong new_ads_board
        model: "Type", // Thay thế bằng tên thực tế của mô hình Type
        select: "label -__t"
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
