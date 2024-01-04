import express from 'express';
import ReportController from '../controllers/report.controller.js';
import authenticate from '../middlewares/authenticate.js';
import uploadCloud from '../middlewares/uploader.js';
import { createReportValidationRules, updateReportValidationRules, handleValidationErrors } from '../validators/report.validator.js';

const router = express.Router();

router.get('/reports', authenticate, ReportController.getAll);
router.get('/reports/citizent', ReportController.getAll);
router.get('/report/:id', ReportController.getById);
router.post('/report', uploadCloud.array('image'), ReportController.create);
router.put('/report/:id', uploadCloud.array('image'), ReportController.update);
router.delete('/report/:id', ReportController.delete);

export default router;
