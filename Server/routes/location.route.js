import express from 'express';
import LocationController from '../controllers/location.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/location', LocationController.getAll);

// // Đọc một Location cụ thể bằng ID
// router.get('/location/:id', LocationController.getLocationById);

// // Tạo mới một Location
router.post('/location', LocationController.create);

// // Cập nhật một Location bằng ID
// router.put('/location/:id', LocationController.updateLocation);

// // Xóa một Location bằng ID
// router.delete('/location/:id', LocationController.deleteLocation);

export default router;


