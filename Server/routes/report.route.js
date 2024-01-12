import express from 'express';
import ReportController from '../controllers/report.controller.js';
import authenticate from '../middlewares/authenticate.js';

import { createReportValidation, updateReportValidation } from '../validators/report.validator.js';

import uploadCloud from '../middlewares/uploader.js';



const router = express.Router();

router.get('/reports', authenticate, ReportController.getAll);
router.get('/reportGroup', authenticate, ReportController.groupReport);
router.get('/reports/citizent', ReportController.getAllTesting);
router.get('/report/:id', ReportController.getById);
router.post('/report', uploadCloud.array('images'), ReportController.create);
router.put('/report/:id', updateReportValidation, uploadCloud.array('images'), ReportController.update);
router.delete('/report/:id', ReportController.delete);

export default router;
