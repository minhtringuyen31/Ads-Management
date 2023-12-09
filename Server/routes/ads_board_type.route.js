import express from 'express';
import AdsBoardTypeController from '../controllers/adsboardtyoe.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/adsboardtypes', AdsBoardTypeController.getAll);

// // Đọc một Location cụ thể bằng ID
// router.get('/location/:id', AdsTypeController.getLocationById);

// // Tạo mới một Location
router.post('/adsboardtype', AdsBoardTypeController.create);

// // Cập nhật một Location bằng ID
// router.put('/location/:id', AdsTypeController.updateLocation);

// // Xóa một Location bằng ID
// router.delete('/location/:id', AdsTypeController.deleteLocation);

export default router;
