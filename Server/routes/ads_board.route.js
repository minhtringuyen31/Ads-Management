import express from 'express';
import AdsBoardController from '../controllers/adsboard.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/adsboards', AdsBoardController.getAll);

router.get('/adboardsByLocation/:id', AdsBoardController.getAllAdBoardByLocation);

// // Đọc một Location cụ thể bằng ID
router.get('/adsboard/:id', AdsBoardController.getDetail);

// // Tạo mới một Location
router.post('/adsboard', AdsBoardController.create);

// // Cập nhật một Location bằng ID
router.put('/adsboard/:id', AdsBoardController.update);

// // Xóa một Location bằng ID
router.delete('/adsboard/:id', AdsBoardController.delete);

export default router;
