import createError from "http-errors";
import AuthorizeRequestService from "../services/authorizeRequest.service.js";
const ModelName = "Authorize Request";
const modelname = "authorize Request";
const AuthorizeRequestController = {
  getAll: async (req, res, next) => {
    try {
      const filter = req.body;
      const lists = await AuthorizeRequestService.getAll(filter);

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
      const object = await AuthorizeRequestService.getById(id);

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
      const newReport = await AuthorizeRequestService.create(reportData);
      if (!newReport) {
        if (req.files) {
          req.files.forEach(file => {
            cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
              console.log(result, error);
            });
          });
        }
        return next(createError.BadRequest("Location not found"))
      }
      res.status(201).json({
        message: ModelName + " created successfully",
        status: 201,
        data: newReport,
      });
    } catch (error) {
      if (req.files) {
        req.files.forEach(file => {
          cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
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
      const updatedObject = await AuthorizeRequestService.update(
        id,
        updateData
      );

      if (!updatedObject) {
        if (req.files) {
          req.files.forEach(file => {
            cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
              console.log(result, error);
            });
          });
        }
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
      if (req.files) {
        req.files.forEach(file => {
          cloudinary.uploader.destroy(extractPublicId(file.path), function (error, result) {
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
      const deletedObject = await AuthorizeRequestService.delete(id);

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

export default AuthorizeRequestController;
