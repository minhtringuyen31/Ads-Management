import express from 'express';
import DistrictController from '../controllers/district.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/districts', DistrictController.getAll);

// // Đọc một Location cụ thể bằng ID
router.get('/getWardsOfDistrict/:id', DistrictController.getWardsOfDistrict);

router.get('/district/:id', DistrictController.getDetail);

// // Tạo mới một Location
router.post('/district', DistrictController.create);

// // Cập nhật một Location bằng ID
router.put('/district/:id', DistrictController.update);

// // Xóa một Location bằng ID
router.delete('/district/:id', DistrictController.delete);

export default router;
