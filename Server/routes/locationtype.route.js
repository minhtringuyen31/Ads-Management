import express from 'express';
import LocationTypeController from '../controllers/locationtype.controller.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/locationtypes', LocationTypeController.getAll);

// // Đọc một Location cụ thể bằng ID
router.get('/locationtype/:id', LocationTypeController.getDetail);

// // Tạo mới một Location
router.post('/locationtype', LocationTypeController.create);

// // Cập nhật một Location bằng ID
router.put('/locationtype/:id', LocationTypeController.update);

// // Xóa một Location bằng ID
router.delete('/locationtype/:id', LocationTypeController.delete);

export default router;
