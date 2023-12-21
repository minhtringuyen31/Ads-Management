import { RefreshToken } from "../models/RefreshTokenModel.js";

const RefreshTokenService = {
  async getAll(filter, projection) {
      return await RefreshToken.find(filter).select(projection);
  },
  // async getAll() {
  //   return await AuthorizeRequest.find();
  // },
  
  async getById(id) {
    return await RefreshToken.findById(id);
  },

  async create(objectData) {
    const newObject = new RefreshToken(objectData);
    return await newObject.save();
  },

  async update(id, updateData) {
    return await RefreshToken.findByIdAndUpdate(id, updateData, { new: true });
  },

  async delete(id) {
    return await RefreshToken.findByIdAndDelete(id);
  }
};

export default RefreshTokenService;
