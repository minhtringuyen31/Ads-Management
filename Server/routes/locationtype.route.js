import express from 'express';
import LocationTypeController from '../controllers/locationtype.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/locationtypes', LocationTypeController.getAll);

// // Đọc một Location cụ thể bằng ID
// router.get('/location/:id', LocationTypeController.getLocationById);

// // Tạo mới một Location
router.post('/locationtype', LocationTypeController.create);

// // Cập nhật một Location bằng ID
// router.put('/location/:id', LocationTypeController.updateLocation);

// // Xóa một Location bằng ID
// router.delete('/location/:id', LocationTypeController.deleteLocation);

export default router;
