import express from 'express';
import AdsBoardController from '../controllers/adsboard.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/adsboards', AdsBoardController.getAll);

// // Đọc một Location cụ thể bằng ID
// router.get('/location/:id', AdsTypeController.getLocationById);

// // Tạo mới một Location
router.post('/adsboard', AdsBoardController.create);

// // Cập nhật một Location bằng ID
// router.put('/location/:id', AdsTypeController.updateLocation);

// // Xóa một Location bằng ID
// router.delete('/location/:id', AdsTypeController.deleteLocation);

export default router;
