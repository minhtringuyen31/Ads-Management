import express from 'express';
import WardController from '../controllers/ward.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/wards', WardController.getAll);

// // Đọc một Location cụ thể bằng ID
router.get('/ward/:id', WardController.getDetail);

// // Tạo mới một Location
router.post('/ward', WardController.create);

// // Cập nhật một Location bằng ID
router.put('/ward/:id', WardController.update);

// // Xóa một Location bằng ID
router.delete('/ward/:id', WardController.delete);

export default router;


