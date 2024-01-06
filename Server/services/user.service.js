import mongoose from "mongoose";
import { Admin, User, WardOfficer, DistrictOfficer } from "../models/UserModel.js";
const UserService = {
  async getAll(filter, projection) {
    try {
      const user = await User.find(filter).select(projection);
      return user;
    } catch (error) {
      throw error;
    }
  },
  async create(data) {
    try {
      var user;
      if (data.userRole == "admin") {
        const admin = new Admin(data);
        user = await admin.save();
      } else if (data.userRole == "ward_officer") {
        const wardOfficer = new WardOfficer(data);
        user = await wardOfficer.save();
      } else if (data.userRole == "district_officer") {
        const districtor = new DistrictOfficer(data);
        user = await districtor.save();
      } else {
        const anonymous = new User(data);
        user = await anonymous.save();
      }
      const userSave = await user.save();
      return userSave;
    } catch (error) {
      throw error;
    }
  },
  async getById(id) {
    try {
      let user = await User.findById(id);
      if(user.__t === "DistrictOfficer"){  
        const user =  await DistrictOfficer.findById(id);
      }
      else if(user.__t === "WardOfficer"){
        const user =  await WardOfficer.findById(id);
      }
      else {
        const user =  await User.findById(id);
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  async update(id, data) {
    try {
      const user = await User.findById(id);
      if(user.__t === "DistrictOfficer"){  
        const updatedUser =  await DistrictOfficer.findByIdAndUpdate(id, data);
      }
      else if(user.__t === "WardOfficer"){
        const updatedUser =  await WardOfficer.findByIdAndUpdate(id, data);
      }
      else {
        const updatedUser =  await User.findByIdAndUpdate(id, data);
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  },
  async delete(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
