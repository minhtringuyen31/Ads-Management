import express from 'express';
import LocationController from '../controllers/location.controller.js';

const router = express.Router();

router.get('/location/list', LocationController.getAllLocation);
// router.get('/location/:id', LocationController.getAllLocation);
// router.post('/location/:id', LocationController.getAllLocation);
// router.delete('/location/:id', LocationController.getAllLocation);

export default router;