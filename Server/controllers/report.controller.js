import createError from "http-errors";
import ReportService from "../services/report.service.js";
import UserService from "../services/user.service.js";
import LocationService from "../services/location.service.js";
import rabbitmq from "../message-broker/rabbitmq.js";
const ModelName = "Report";
const modelname = "report";
import { fromJson } from "../helper/dto.js";
import {
  createMongooseQuery,
  createMongooseSortObject,
} from "../helper/filter.js";
import { v2 as cloudinary } from "cloudinary";

import { extractPublicId } from "cloudinary-build-url";
const ReportController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      const reports = await ReportService.getAll(filter);

      const lists = reports.map((report) => {
        if (report.type === "location" && report.location) {
          // If the report type is location and there is a location, add the coordinate property
          return {
            ...report,
            ward: report.location.ward,
            district: report.location.ward.district,
          };
        } else if (
          report.type === "board" &&
          report.board &&
          report.board.location
        ) {
          // If the report type is board and there is a board and a location_id, add the coordinate property
          return {
            ...report,
            ward: report.board.location.ward,
            district: report.board.location.ward.district,
          };
        }
        return report;
      });
      let filteredLists = lists;
      const user = await UserService.getById(req.user.userId);
      const assigned_areaid = user.assigned_areaid;
      if (user.__t === "WardOfficer") {
        filteredLists = lists.filter(
          (report) => report.ward === assigned_areaid
        );
      } else if (user.__t === "DistrictOfficer") {
        filteredLists = lists.filter(
          (report) => report.district === assigned_areaid
        );
      }

      res.json({
        message: "Get " + modelname + " list successfully",
        status: 200,
        // size: filteredLists.length,
        // size_all: reports.length,
        data: filteredLists,
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
      // if (reportData.type === 'random') {
      //   const randomData = reportData.randomLocation;
      //   const districtRadomData = reportData.address.suburb;
      //   const wardList = [];
      //   const districtList = await LocationService.getAll();

      // }
      const files = req.files;
      if (files) {
        reportData.image = files.map((file) => file.path);
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
          files.forEach(async (file) => {
            await cloudinary.uploader.destroy(
              extractPublicId(file.path),
              function (error, result) {
                console.log(result, error);
              }
            );
          });
        }
        res.json({
          message: "Create location failed",
          status: 400,
          data: newReport,
        });
      }
    } catch (error) {
      if (req.files) {
        req.files.forEach(async (file) => {
          await cloudinary.uploader.destroy(
            extractPublicId(file.path),
            function (error, result) {
              console.log(result, error);
            }
          );
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
        updateData.image = files.map((file) => file.path);
      }
      const updatedObject = await ReportService.update(id, updateData);

      if (!updatedObject) {
        if (req.files) {
          req.files.forEach((file) => {
            cloudinary.uploader.destroy(file.path, function (error, result) {
              console.log(result, error);
            });
          });
        }
        return next(
          createError.NotFound(ModelName + ` with id ${id} not found`)
        );
      } else {
        res.json({
          message: ModelName + " updated successfully",
          status: 200,
          data: updatedObject,
        });
      }

      if (updateData.operation) {
        const message = await ReportService.getById(updatedObject._id);
        rabbitmq.publishMessage("MAIL", message);
      }

      res.json({
        message: ModelName + " updated successfully",
        status: 200,
        data: updatedObject,
      });
    } catch (error) {
      if (req.files) {
        req.files.forEach((file) => {
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
