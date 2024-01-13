import createError from "http-errors";
import EditRequestService from "../services/editRequest.service.js";
import NotificationService from "../services/notification.service.js";
import AdsBoardService from "../services/ads_board.service.js";
import LocationService from "../services/location.service.js";

import UserService from "../services/user.service.js";
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
      const newEditRequest = await EditRequestService.create(reportData);
      if (newEditRequest) {
        console.log('Đang tạo notification');
        const newNotification = {
          title: "Bạn có 1 yêu cầu chỉnh sửa cần xét duyệt",
          subtitle: "",
          content: newEditRequest,
          type: "edit_request",
        };
        const data = await NotificationService.create(newNotification);

        console.log(data);
        global.io
          .to("659fd42b84937c4e3ee9a888")
          .emit("new_edit_request", data);
        res.status(201).json({
          message: ModelName + " created successfully",
          status: 201,
          data: newEditRequest,
        });
      }

    } catch (error) {
      // req.files.forEach(async (file) => {
      //   await cloudinary.uploader.destroy(
      //     extractPublicId(file.path),
      //     function (error, result) {
      //       console.log(result, error);
      //     }
      //   );
      // });
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

      // Handle by Quang Thanh to update location and adsboard when province update status completed
      if (updatedObject && updatedObject.status === "Completed" && updatedObject.type === 'board') {
        const newAdsBoard = await AdsBoardService.update(updatedObject.newInformation.id, updatedObject.newInformation);
        if (!newAdsBoard) {
          if (req.files) {
            req.files.forEach(file => {
              cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                console.log(result, error);
              });
            });
          }
          return next(createError.BadRequest("AdsBoard not created"))
        }
      } else if (updatedObject && updatedObject.status === "Completed" && updatedObject.type === 'location') {
        const newAdsBoard = await LocationService.update(updatedObject.newInformation.id, updatedObject.newInformation);
        if (!newAdsBoard) {
          if (req.files) {
            req.files.forEach(file => {
              cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
                console.log(result, error);
              });
            });
          }
          return next(createError.BadRequest("Location not crreate"))
        }
      }
      // End by Quang Thanh

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
