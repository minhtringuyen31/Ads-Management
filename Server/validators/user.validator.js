// validators/userValidator.js
import { body } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    console.log("error", errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

export const createUserValidation = [
  body('fullname').isString().notEmpty().withMessage('Họ tên không được để trống'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('phone').isString().notEmpty().withMessage('Số điện thoại không được để trống'),
  body('password').isString().withMessage('Mật khẩu không hợp lệ').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('avatar').isString().optional().withMessage('Avatar không hợp lệ'),
  body('dob').isDate().optional().withMessage('Ngày sinh không hợp lệ'),
  body('userRole').isIn(['anonymous', 'admin', 'ward_officer', 'district_officer']).withMessage('Vai trò không hợp lệ'),
  body('gender').isIn(['male', 'female', 'other']).optional().withMessage('Giới tính không hợp lệ'),
  handleValidationErrors,
];

export const updateUserValidation =  [
  body('fullname').isString().optional().notEmpty().withMessage('Họ tên không được để trống'),
  body('email').isEmail().optional().withMessage('Email không hợp lệ'),
  body('phone').isString().optional().notEmpty().withMessage('Số điện thoại không được để trống'),
  body('password').isString().withMessage('Mật khẩu không hợp lệ').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
  body('avatar').isString().optional().withMessage('Avatar không hợp lệ'),
  body('dob').isDate().optional().withMessage('Ngày sinh không hợp lệ'),
  body('userRole').isIn(['anonymous', 'admin', 'ward_officer', 'district_officer']).optional().withMessage('Vai trò không hợp lệ'),
  body('gender').isIn(['male', 'female', 'other']).optional().withMessage('Giới tính không hợp lệ'),
  handleValidationErrors,
];

// Thêm các quy tắc validation khác nếu cần
