import createError from "http-errors";
import ReportService from "../services/report.service.js";
const ModelName = "Report";
const modelname = "report";
const ReportController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      const lists = await ReportService.getAll(filter);
      
      if (!lists) {
        return next(createError.BadRequest(ModelName + " list not found"));
      }

      const reportsWithCoordinates = lists.map((report) => {
        if (report.type === "location" && report.location) {
          // If the report type is location and there is a location, add the coordinate property
          return { ...report.toObject(), coordinate: report.location.coordinate };
        } else if (report.type === "board" && report.board && report.board.location_id) {
          // If the report type is board and there is a board and a location_id, add the coordinate property
          return { ...report.toObject(), coordinate: report.board.location_id.coordinate };
        }
  
        // If the type is neither location nor board, or if the required properties are not available, return the original report
        return report;
      });
      
      res.json({
        message: "Get " + modelname + " list successfully",
        status: 200,
        data: reportsWithCoordinates,
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const object = await ReportService.getById(id)

      if (!object) {
        return next(createError.NotFound(ModelName + ` with id ${id} not found`));
      }

      res.json({
        message: "Get " + modelname + " successfully",
        status: 200,
        data: object
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  create: async (req, res, next) => {
    try {
      const reportData = req.body;
      const newReport = await ReportService.create(reportData);

      res.status(201).json({
        message: ModelName + " created successfully",
        status: 201,
        data: newReport
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedObject = await ReportService.update(id, updateData);

      if (!updatedObject) {
        return next(createError.NotFound(ModelName + ` with id ${id} not found`));
      }

      res.json({
        message: ModelName + " updated successfully",
        status: 200,
        data: updatedObject
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedObject = await ReportService.delete(id);

      if (!deletedObject) {
        return next(createError.NotFound(ModelName + ` with id ${id} not found`));
      }

      res.json({
        message: ModelName + " deleted successfully",
        status: 200,
        data: deletedObject
      });
    } catch (error) {
      next(createError.InternalServerError(error.message));
    }
  }
};

export default ReportController;
