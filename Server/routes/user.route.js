import express from 'express';
import User from '../controllers/user.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/users', User.getAll);

router.get('/user/:id', User.getDetail);

// // Tạo mới một Location
router.post('/user', User.create);

// // Cập nhật một Location bằng ID
router.put('/user/:id', User.update);

// // Xóa một Location bằng ID
router.delete('/user/:id', User.delete);

export default router;
