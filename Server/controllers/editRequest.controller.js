import createError from "http-errors";
import EditRequestService from "../services/editRequest.service.js";
const ModelName = "Edit Request";
const modelname = "edit Request";
import { extractPublicId } from "cloudinary-build-url";
import { v2 as cloudinary } from "cloudinary";
const EditRequestController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      const lists = await EditRequestService.getAll(filter);

      if (!lists) {
        return next(createError.BadRequest(ModelName + " list not found"));
      }

      //   const users = await LocationService.getAllLocation(
      //     filter,
      //     "-password -refreshToken"
      //   );
      res.json({
        message: "Get " + modelname + " list successfully",
        status: 200,
        data: lists,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const object = await EditRequestService.getById(id);

      if (!object) {
        return next(
          createError.NotFound(ModelName + ` with id ${id} not found`)
        );
      }

      res.json({
        message: "Get " + modelname + " successfully",
        status: 200,
        data: object,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  create: async (req, res, next) => {
    try {
      const reportData = req.body;
      const files = req.files;
      console.log(req.files);
      console.log(reportData);
      if (files) {
        reportData.newInformation.image = files.map((file) => file.path);
      }
      const newReport = await EditRequestService.create(reportData);
      global.io
        .to("659fd42b84937c4e3ee9a888")
        .emit("new_edit_request", newReport);
      res.status(201).json({
        message: ModelName + " created successfully",
        status: 201,
        data: newReport,
      });
    } catch (error) {
      files.forEach(async (file) => {
        await cloudinary.uploader.destroy(
          extractPublicId(file.path),
          function (error, result) {
            console.log(result, error);
          }
        );
      });
      next(createError.InternalServerError(error.message));
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedObject = await EditRequestService.update(
        id,
        updateData
      );

      if (!updatedObject) {
        return next(
          createError.NotFound(ModelName + ` with id ${id} not found`)
        );
      }

      res.json({
        message: ModelName + " updated successfully",
        status: 200,
        data: updatedObject,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedObject = await EditRequestService.delete(id);
      if (!deletedObject) {
        return next(
          createError.NotFound(ModelName + ` with id ${id} not found`)
        );
      }

      res.json({
        message: ModelName + " deleted successfully",
        status: 200,
        data: deletedObject,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },
};

export default EditRequestController;
