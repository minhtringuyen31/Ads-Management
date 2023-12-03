import express from 'express';
import AuthorizeRequestController from '../controllers/authorizeRequest.controller.js';

const router = express.Router();

router.get('/authorizeRequests', AuthorizeRequestController.getAll);
router.get('/authorizeRequest/:id', AuthorizeRequestController.getById);
router.post('/authorizeRequest', AuthorizeRequestController.create);
router.put('/authorizeRequest/:id', AuthorizeRequestController.update);
router.delete('/authorizeRequest/:id', AuthorizeRequestController.delete);

export default router;
