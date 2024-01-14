import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const createAdsBoardValidation = [
  body('location').isMongoId().optional().withMessage('Location must be a valid ObjectId'),
  body('adsboard_type').isMongoId().withMessage('Adsboard type is required and must be a valid ObjectId'),
  // body('width').isNumeric().withMessage('Width is required and must be a number'),
  // body('height').isNumeric().withMessage('Height is required and must be a number'),
  body('contract_start_date').isISO8601().toDate().withMessage('Contract start date is required and must be a valid date in ISO8601 format'),
  body('contract_end_date').isISO8601().toDate().withMessage('Contract end date is required and must be a valid date in ISO8601 format'),
  body('image').isArray().withMessage('Image must be an array'),
  body('company').isMongoId().optional().withMessage('Company must be a valid ObjectId'),
  handleValidationErrors,
];

export const updateAdsBoardValidation = [
  body('location').isMongoId().optional().withMessage('Location must be a valid ObjectId'),
  body('adsboard_type').isMongoId().optional().withMessage('Adsboard type must be a valid ObjectId'),
  // body('width').isNumeric().optional().withMessage('Width must be a number'),
  // body('height').isNumeric().optional().withMessage('Height must be a number'),
  body('contract_start_date').isISO8601().toDate().optional().withMessage('Contract start date must be a valid date in ISO8601 format'),
  body('contract_end_date').isISO8601().toDate().optional().withMessage('Contract end date must be a valid date in ISO8601 format'),
  body('image').isArray().optional().withMessage('Image must be an array'),
  body('company').isMongoId().optional().withMessage('Company must be a valid ObjectId'),
  handleValidationErrors,
];
