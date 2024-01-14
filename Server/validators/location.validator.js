import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const createLocationValidation = [
  // body("coordinate.lat").isNumeric().withMessage("Latitude must be a number"),
  // body("coordinate.lng").isNumeric().withMessage("Longitude must be a number"),
  body("display_name")
    .isString()
    .optional()
    .withMessage("Display name must be a string"),
  body("address")
    .isString().optional()
    .withMessage("Address is required and must be a string"),
  body("ward")
    .optional()
    .isMongoId()
    .withMessage("Ward is required and must be a valid ObjectId"),
  body("district")
    .optional()
    .isMongoId()
    .withMessage("District is required and must be a valid ObjectId"),
  body("location_type")
    .optional()
    .isMongoId()
    .withMessage("Location type is required and must be a valid ObjectId"),
  body("ads_type")
    .optional()
    .isMongoId()
    .withMessage("Ads type is required and must be a valid ObjectId"),
  body("image").isArray().optional().withMessage("Image is required and must be an array"),
  body("is_planned")
    .isBoolean()
    .optional()
    .withMessage("Is planned must be a boolean"),
  handleValidationErrors,
];

export const updateLocationValidation = [
  body("display_name")
    .isString()
    .optional()
    .withMessage("Display name must be a string"),
  body("address").isString().optional().withMessage("Address must be a string"),
  body("ward")
    .isMongoId()
    .optional()
    .withMessage("Ward must be a valid ObjectId"),
  body("district")
    .isMongoId()
    .optional()
    .withMessage("District must be a valid ObjectId"),
  body("location_type")
    .isMongoId()
    .optional()
    .withMessage("Location type must be a valid ObjectId"),
  body("ads_type")
    .isMongoId()
    .optional()
    .withMessage("Ads type must be a valid ObjectId"),
  body("is_planned")
    .isBoolean()
    .optional()
    .withMessage("Is planned must be a boolean"),
  handleValidationErrors,
];
