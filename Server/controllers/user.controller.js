import createError from "http-errors";
import UserService from "../services/user.service.js";
import { hashPassword, comparePasswords } from "../utils/hash.js";
const UserController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      global.io.emit("test", "123");

      const users = await UserService.getAll(filter, "");
      if (!users) {
        return next(createError.BadRequest("User list not found"));
      }
      res.json({
        message: "Get User list successfully",
        status: 200,
        data: users,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  create: async (req, res, next) => {
    try {
      const data = req.body;
      console.log(data);
      data.password = await hashPassword(data.password);
      const checkUser = await UserService.getByEmail(data.email);
      if(checkUser){
        return next(createError.BadRequest("Email already exists"));
      }
      const user = await UserService.create(data);
      if (!user) {
        return next(createError.BadRequest("User wasn't created"));
      }

      res.json({
        message: "Create User successfully",
        status: 200,
        data: user,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },
  update: async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.params;
      if (data.password !== null && data.password !== undefined) {
        data.password = await hashPassword(data.password);
      }
      const user = await UserService.update(id, data);
      if (!user) {
        return next(createError.BadRequest("User not found"));
      }
      res.json({
        message: "Update User successfully",
        status: 200,
        data: user,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },
  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const location = await UserService.getById(id);

      if (!location) {
        return next(createError.BadRequest("User not found"));
      }
      res.json({
        message: "Get User successfully",
        status: 200,
        data: location,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const location = await UserService.delete(id);
      if (!location) {
        return next(createError.BadRequest("User not found"));
      }
      res.json({
        message: "Delete User successfully",
        status: 200,
        data: location,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },
};

export default UserController;
