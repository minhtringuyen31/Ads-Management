import createError from "http-errors";
import ReportService from "../services/report.service.js";
import rabbitmq from '../message-broker/rabbitmq.js'
const ModelName = "Report";
const modelname = "report";
import { fromJson } from "../helper/dto.js";
import { createMongooseQuery, createMongooseSortObject } from "../helper/filter.js";
import { v2 as cloudinary } from 'cloudinary';

import { extractPublicId } from 'cloudinary-build-url'
const ReportController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      const lists = await ReportService.getAll(filter);

      if (!lists) {
        return next(createError.BadRequest(ModelName + " list not found"));
      }

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
      const object = await ReportService.getById(id);

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
      if (files) {
        reportData.image = files.map(file => file.path);
      }
      const newReport = await ReportService.create(reportData);
      if (newReport) {
        res.status(201).json({
          message: ModelName + " created successfully",
          status: 201,
          data: newReport,
        });
      } else {
        if (files) {
          files.forEach(async file => {
            await cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
              console.log(result, error);
            });
          });
        }
        res.json({
          message: "Create location failed",
          status: 400,
          data: newReport
        })
      }


<<<<<<< HEAD

=======
      res.status(201).json({
        message: ModelName + " created successfully",
        status: 201,
        data: newReport,
      });
>>>>>>> 2d415ba12f695c656f94848026b360e9bc56f338
    } catch (error) {
      if (req.files) {
        req.files.forEach(async file => {
          await cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
            console.log(result, error);
          });
        });
      }
      next(createError.InternalServerError(error.message));
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const files = req.files;
      if (files) {
        updateData.image = files.map(file => file.path);
      }
      const updatedObject = await ReportService.update(id, updateData);

      if (!updatedObject) {
        if (req.files) {
          req.files.forEach(file => {
            cloudinary.uploader.destroy(file.path, function (error, result) {
              console.log(result, error);
            });
          });
        }
        return next(
          createError.NotFound(ModelName + ` with id ${id} not found`)
        );
      }
      else {

        res.json({
          message: ModelName + " updated successfully",
          status: 200,
          data: updatedObject,
        });
      }

<<<<<<< HEAD
=======
      if(updateData.operation){
        const message = await ReportService.getById(updatedObject._id);
        rabbitmq.publishMessage("MAIL", message)
      }

      res.json({
        message: ModelName + " updated successfully",
        status: 200,
        data: updatedObject,
      });
>>>>>>> 2d415ba12f695c656f94848026b360e9bc56f338
    } catch (error) {
      if (req.files) {
        req.files.forEach(file => {
          cloudinary.uploader.destroy(file.path, function (error, result) {
            console.log(result, error);
          });
        });
      }
      next(createError.InternalServerError(error.message));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedObject = await ReportService.delete(id);

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

export default ReportController;
