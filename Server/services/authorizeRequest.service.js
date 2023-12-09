import { AuthorizeRequest } from "../models/AuthorizeRequestModel.js";

const AuthorizeRequestService = {
  async getAll(filter, projection) {
      return await AuthorizeRequest.find(filter).select(projection);
  },
  // async getAll() {
  //   return await AuthorizeRequest.find();
  // },

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
