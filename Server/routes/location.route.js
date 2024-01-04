import express from 'express';
import LocationController from '../controllers/location.controller.js';
import uploadCloud from '../middlewares/uploader.js';

const router = express.Router();


router.get('/location/healthCheck', LocationController.healthCheck);

// Đọc danh sách tất cả các đối tượng Location
router.get('/locations', LocationController.getAll);

router.get('/location/reverse-geocoding', LocationController.revereGeocode);

//Đọc một Location cụ thể bằng ID
router.get('/location/:id', LocationController.getDetail);

// Tạo mới một Location
router.post('/location', uploadCloud.array('image'), LocationController.create);

// Cập nhật một Location bằng ID
router.put('/location/:id', uploadCloud.array('image'), LocationController.update);

// Xóa một Location bằng ID
router.delete('/location/:id', LocationController.delete);

export default router;


