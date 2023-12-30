import express from 'express';
import ReportController from '../controllers/report.controller.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/reports', authenticate, ReportController.getAll);
router.get('/report/:id', ReportController.getById);
router.post('/report', ReportController.create);
router.put('/report/:id', ReportController.update);
router.delete('/report/:id', ReportController.delete);

export default router;
