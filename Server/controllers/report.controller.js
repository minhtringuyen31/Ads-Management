import createError from "http-errors";
import ReportService from "../services/report.service.js";
import UserService from "../services/user.service.js";
import LocationService from "../services/location.service.js";
import WardService from "../services/ward.service.js";
import rabbitmq from "../message-broker/rabbitmq.js";
const ModelName = "Report";
const modelname = "report";
import NotificationService from "../services/notification.service.js";
import { Report } from "../models/ReportModel.js";
import { fromJson } from "../helper/dto.js";
import {
  createMongooseQuery,
  createMongooseSortObject,
} from "../helper/filter.js";

import { normalizeString } from "../utils/utils.js";
import { extractPublicId } from "cloudinary-build-url";
import { v2 as cloudinary } from "cloudinary";
import DistrictService from "../services/district.service.js";
import AdsBoardService from "../services/ads_board.service.js";
const ReportController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      const reports = await ReportService.getAll(filter);

      let filteredLists = reports;
      const user = await UserService.getById(req.user.userId);
      console.log("user", user)
      if(user.__t !== "ProvinceOfficer" && user.assigned_areaid == null ){
        res.status(400).json({message: "bạn éo có quyền"})
      }
      console.log("user", user)

      if (user.__t === "WardOfficer") {
        const assigned_areaid = user.assigned_areaid._id.toString();
        filteredLists = reports.filter(
          (report) => report.ward._id.toString() === assigned_areaid
        );
      } else if (user.__t === "DistrictOfficer") {
        //console.log("assigned_areaid")
        const assigned_areaid = user.assigned_areaid._id.toString();
        filteredLists = reports.filter(
          (report) => report.district._id.toString() === assigned_areaid
        );
      }

      res.json({
        message: "Get " + modelname + " list successfully",
        status: 200,
        size: filteredLists.length,
        size_all: reports.length,
        data: filteredLists,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },
  groupReport: async (req, res, next) => {
    try {
      const filter = req.body;
      const reports = await ReportService.getAll(filter);

      let filteredLists = reports;
      const user = await UserService.getById(req.user.userId);
      //console.log("user", user)
      if(!user.assigned_areaid && user.__t !== "ProvinceOfficer"){
        res.status(400).json({message: "bạn éo có quyền"})
      }
      console.log("user", user)
      if (user.__t === "WardOfficer") {
        const assigned_areaid = user.assigned_areaid._id.toString();
        filteredLists = reports.filter(
          (report) => report.ward._id.toString() === assigned_areaid
        );
      } else if (user.__t === "DistrictOfficer") {
        console.log("ok")
        const assigned_areaid = user.assigned_areaid._id.toString();
        filteredLists = reports.filter(
          (report) => report.district._id.toString() === assigned_areaid
        );
      }

      const lists = filteredLists.map((report) => {
        if (report.type === "location" && report.location) {
          // If the report type is location and there is a location, add the coordinate property
          return {
            ...report,
            lat: report.location.coordinate.lat,
            lng: report.location.coordinate.lng,
          };
        } else if (
          report.type === "board" &&
          report.board &&
          report.board.location
        ) {
          // If the report type is board and there is a board and a location_id, add the coordinate property
          return {
            ...report,
            lat: report.board.location.coordinate.lat,
            lng: report.board.location.coordinate.lng,
          };
        } else if (report.type === "random" && report.random) {
          console.log(report.coordinate)
          // If the report type is board and there is a board and a location_id, add the coordinate property
          return {
            ...report,
            lat: report.coordinate.lat,
            lng: report.coordinate.lng,
          };
        }
        console.log("test", report);
        return report;
      });

      const groupedLocations = lists.reduce((acc, report) => {
        const key = `${report.lat}_${report.lng}`;

        if (!acc[key]) {
          acc[key] = { lat: report.lat, lng: report.lng, reportList: [] };
        }

        acc[key].reportList.push(report);

        return acc;
      }, {});

      // Chuyển đổi đối tượng các địa điểm đã được nhóm thành một mảng
      const locations = Object.values(groupedLocations);

      res.json({
        message: "Get " + modelname + " list successfully",
        status: 200,
        size: locations.length,
        // size_all: reports.length,
        data: locations,
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
      const reportData = JSON.parse(JSON.stringify(req.body));
      // Add by Quang Thanh to handle save record when type = random location
      if (reportData.type === "random") {
        const randomData = reportData.random;
        const districtLabelRadomData = randomData.address.suburb;
        const wardLabelRadomData = randomData.address.quarter;
        let district_id = "";
        let ward_id = "";
        // Process get district id and ward id
        const districtList = await DistrictService.getAll();
        districtList.forEach((district) => {
          if (
            normalizeString(district.label) ===
            normalizeString(districtLabelRadomData)
          ) {
            district_id = district._id;
          }
        });
        if (district_id && district_id != "") {
          const wardList = await WardService.getAllByDistrictId(district_id);
          wardList.forEach((ward) => {
            if (
              normalizeString(ward.label) ===
              normalizeString(wardLabelRadomData)
            ) {
              ward_id = ward._id;
            }
          });
        }
        // Update form
        reportData.coordinate = {};
        reportData.coordinate["lat"] = randomData.lat;
        reportData.coordinate["lng"] = randomData.lon;
        reportData.random = randomData;
        if (district_id && district_id != "") {
          reportData.district = district_id;
        }
        if (ward_id && ward_id != "") {
          reportData.ward = ward_id;
        }
      }

      // Handle save changes when type = board or location
      if (reportData.type === "board") {
        const board = await AdsBoardService.getById(reportData.board);
        reportData.district = board.location.district._id;
        reportData.ward = board.location.ward._id;
      } else if (reportData.type === "location") {
        const location = await LocationService.getById(reportData.location);
        console.log(location);
        reportData.district = location.district._id;
        reportData.ward = location.ward._id;
      }
      // End by Quang Thanh

      const files = req.files;
      console.log(req.files);
      console.log(reportData);
      if (files) {
        reportData.image = files.map((file) => file.path);
      }

      const newReport = await ReportService.create(reportData);
      if (newReport) {
        console.log('Đang tạo notification');
        const newNotification = {
          title: "Có 1 báo cáo mới !!!",
          subtitle: "",
          content: newReport,
          type: "report",
          clientId: newReport.clientId,
        };
        const data = await NotificationService.create(newNotification);

        console.log(data);
        // Gửi báo cáo đến cán bộ phường/quận
        if (newReport.ward) {
          console.log("Sending notification to ward:", newReport.ward.toString());
          global.io
            .to(newReport.ward.toString())
            .emit("new_notification", data);
        } else {
          console.log("Ward is undefined or falsy.");
        }

        if (newReport.district) {
          console.log("Sending notification to district:", newReport.district.toString());
          global.io
            .to(newReport.district.toString())
            .emit("new_notification", data);
        } else {
          console.log("District is undefined or falsy.");
        }
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
