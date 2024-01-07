import createError from "http-errors";
import ReportService from "../services/report.service.js";
import UserService from "../services/user.service.js";
import LocationService from "../services/location.service.js";
import WardService from "../services/ward.service.js";
import rabbitmq from "../message-broker/rabbitmq.js";
const ModelName = "Report";
const modelname = "report";
import { fromJson } from "../helper/dto.js";
import {
  createMongooseQuery,
  createMongooseSortObject,
} from "../helper/filter.js";
import { v2 as cloudinary } from "cloudinary";
import { normalizeString } from "../utils/utils.js";
import { extractPublicId } from "cloudinary-build-url";
import DistrictService from "../services/district.service.js";
const ReportController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      const reports = await ReportService.getAll(filter);
      let filteredLists = reports;
      const user = await UserService.getById(req.user.userId);
      const assigned_areaid = user.assigned_areaid;
      if (user.__t === "WardOfficer") {
        filteredLists = reports.filter(
          (report) => report.ward._id === assigned_areaid
        );
      } else if (user.__t === "DistrictOfficer") {
        filteredLists = reports.filter(
          (report) => report.district._id === assigned_areaid
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
  getAllTesting: async (req, res, next) => {
    try {
      const filter = req.body;
      const reports = await ReportService.getAll(filter);


      res.json({
        message: "Get " + modelname + " list successfully",
        status: 200,
        // size: filteredLists.length,
        // size_all: reports.length,
        data: reports,
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
      // Add by Quang Thanh to handle save record when type = random location
      if (reportData.type === 'random') {
        const randomData = JSON.parse((reportData.random));
        const districtLabelRadomData = JSON.parse(JSON.stringify(randomData.address)).suburb;
        const wardLabelRadomData = JSON.parse(JSON.stringify(randomData.address)).quarter;
        let district_id = '';
        let ward_id = '';
        // Process get district id and ward id 
        const districtList = await DistrictService.getAll();
        districtList.forEach((district) => {
          if (normalizeString(district.label) === normalizeString(districtLabelRadomData)) {
            district_id = district._id;
          }
        });
        if (district_id && district_id != '') {
          const wardList = await WardService.getAllByDistrictId(district_id);
          wardList.forEach((ward) => {
            if (normalizeString(ward.label) === normalizeString(wardLabelRadomData)) {
              ward_id = ward._id;
            }
          });
        }
        // Update form 
        reportData.coordinate = {}
        reportData.coordinate['lat'] = randomData.lat;
        reportData.coordinate['lng'] = randomData.lon;
        if (district_id && district_id != '') {
          reportData.district = district_id;
        }
        if (ward_id && ward_id != '') {
          reportData.ward = ward_id;
        }

      }

      // Handle save changes when type = board or location
      if (reportData.type === 'board') {
        reportData.district = reportData.board.location.district;
        reportData.ward = reportData.board.location.ward;
      } else if (reportData.type === 'location') {
        reportData.district = reportData.location.district;
        reportData.ward = reportData.location.ward;
      }
      // End by Quang Thanh

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
