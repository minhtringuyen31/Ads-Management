import express from 'express';
import Notification from '../controllers/notification.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/notifications', Notification.getAll);

// // Đọc một Location cụ thể bằng ID
router.get('/notification/:id', Notification.getDetail);

// // Tạo mới một Location
router.post('/notification', Notification.create);

// // Cập nhật một Location bằng ID
router.put('/notification/:id', Notification.update);

// // Xóa một Location bằng ID
router.delete('/notification/:id', Notification.delete);

export default router;
