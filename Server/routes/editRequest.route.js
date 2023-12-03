import express from 'express';
import EditRequestController from '../controllers/editRequest.controller.js';

const router = express.Router();

router.get('/editRequests', EditRequestController.getAll);
router.get('/editRequest/:id', EditRequestController.getById);
router.post('/editRequest', EditRequestController.create);
router.put('/editRequest/:id', EditRequestController.update);
router.delete('/editRequest/:id', EditRequestController.delete);

export default router;
