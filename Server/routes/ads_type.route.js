import express from 'express';
import AdsTypeController from '../controllers/adstype.controler.js';

const router = express.Router();

// Đọc danh sách tất cả các đối tượng Location
router.get('/adstypes', AdsTypeController.getAll);

// // Đọc một Location cụ thể bằng ID
router.get('/adstype/:id', AdsTypeController.getDetail);

// // Tạo mới một Location
router.post('/adstype', AdsTypeController.create);

// // Cập nhật một Location bằng ID
router.put('/adstype/:id', AdsTypeController.update);

// // Xóa một Location bằng ID
router.delete('/adstype/:id', AdsTypeController.delete);

export default router;
