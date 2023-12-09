import express from 'express';
import DistrictController from '../controllers/district.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/districts', DistrictController.getAll);

// // Đọc một Location cụ thể bằng ID
// router.get('/location/:id', LocationType.getLocationById);

// // Tạo mới một Location
router.post('/district', DistrictController.create);

// // Cập nhật một Location bằng ID
// router.put('/location/:id', LocationType.updateLocation);

// // Xóa một Location bằng ID
// router.delete('/location/:id', LocationType.deleteLocation);

export default router;
