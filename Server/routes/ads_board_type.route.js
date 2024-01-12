import express from 'express';
import AdsBoardTypeController from '../controllers/adsboardtyoe.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/adsboardtypes', AdsBoardTypeController.getAll);

// // Đọc một Location cụ thể bằng ID
router.get('/adsboardtype/:id', AdsBoardTypeController.getDetail);

// // Tạo mới một Location
router.post('/adsboardtype', AdsBoardTypeController.create);

// // Cập nhật một Location bằng ID
router.put('/adsboardtype/:id', AdsBoardTypeController.update);

// // Xóa một Location bằng ID
router.delete('/adsboardtype/:id', AdsBoardTypeController.delete);

export default router;
