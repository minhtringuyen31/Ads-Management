import express from 'express';
import Company from '../controllers/company.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/companys', Company.getAll);

router.get('/company/:id', Company.getDetail);

// // Tạo mới một Location
router.post('/company', Company.create);

// // Cập nhật một Location bằng ID
router.put('/company/:id', Company.update);

// // Xóa một Location bằng ID
router.delete('/company/:id', Company.delete);

export default router;
