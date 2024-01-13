import express from 'express';
import LocationController from '../controllers/location.controller.js';
import uploadCloud from '../middlewares/uploader.js';
import authenticate from '../middlewares/authenticate.js';
import { createLocationValidation, updateLocationValidation } from '../validators/location.validator.js';
const router = express.Router();


router.get('/location/healthCheck', LocationController.healthCheck);

// Đọc danh sách tất cả các đối tượng Location
router.get('/locations', authenticate, LocationController.getAll);
router.get('/locations/citizen', LocationController.getAll_citizen);
router.get('/location/reverse-geocoding', LocationController.revereGeocode);

//Đọc một Location cụ thể bằng ID
router.get('/location/:id', LocationController.getDetail);

// Tạo mới một Location
router.post('/location', updateLocationValidation, uploadCloud.array('image'), LocationController.create);

// Cập nhật một Location bằng ID
router.put('/location/:id', updateLocationValidation, uploadCloud.array('image'), LocationController.update);

// Xóa một Location bằng ID
router.delete('/location/:id', LocationController.delete);

export default router;


