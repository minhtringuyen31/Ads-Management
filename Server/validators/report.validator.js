// validators/reportValidator.js
import { body, param, validationResult } from "express-validator";
const reportFormEnum = {
  denounce: "Tố giác sai phạm",
  register: "Đăng ký nội dung",
  feedback: "Đóng góp ý kiến",
  question: "Giải đáp thắc mắc",
};

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const createReportValidation = [
  body("report_form")
    .isIn(Object.keys(reportFormEnum))
    .withMessage("Loại báo cáo không hợp lệ"),
  body("username")
    .isString()
    .notEmpty()
    .withMessage("Tên người báo cáo không được để trống"),
  body("email").isEmail().optional().withMessage("Email không hợp lệ"),
  body("phone_number")
    .isMobilePhone("any", { strictMode: false })
    .notEmpty()
    .withMessage("Số điện thoại không hợp lệ"),
  body("report_content")
    .isString()
    .notEmpty()
    .withMessage("Nội dung báo cáo không được để trống"),
  body("type").isIn(["location", "board"]).withMessage("Loại không hợp lệ"),
  body("location")
    .optional()
    .isMongoId()
    .withMessage("ID địa điểm không hợp lệ"),
  body("board")
    .optional()
    .isMongoId()
    .withMessage("ID bảng quảng cáo không hợp lệ"),
  body("images")
    .optional()
    .isArray()
    .withMessage("Danh sách hình ảnh không hợp lệ"),
  handleValidationErrors,
];

export const updateReportValidation = () => [
  param("id").isMongoId().withMessage("ID báo cáo không hợp lệ"),
  body("status")
    .isIn(["pending", "completed"])
    .withMessage("Trạng thái không hợp lệ"),
  body("operation.user")
    .optional()
    .isMongoId()
    .withMessage("ID người thực hiện không hợp lệ"),
  body("operation.content")
    .optional()
    .isString()
    .withMessage("Nội dung thao tác không hợp lệ"),
  handleValidationErrors,
];

// Thêm các quy tắc validation khác nếu cần
