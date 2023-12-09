import { EditRequest } from "../models/EditRequestModel.js";

const EditRequestService = {
  async getAll(filter, projection) {
      return await EditRequest.find(filter).select(projection);
  },
  // async getAll() {
  //   return await EditRequest.find();
  // },

  async getById(id) {
    return await EditRequest.findById(id);
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
