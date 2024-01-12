import express from 'express';
import ReportTypeController from '../controllers/reporttype.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/reporttypes', ReportTypeController.getAll);

// // Đọc một Location cụ thể bằng ID
router.get('/reporttype/:id', ReportTypeController.getDetail);

// // Tạo mới một Location
router.post('/reporttype', ReportTypeController.create);

// // Cập nhật một Location bằng ID
router.put('/reporttype/:id', ReportTypeController.update);

// // Xóa một Location bằng ID
router.delete('/reporttype/:id', ReportTypeController.delete);

export default router;
