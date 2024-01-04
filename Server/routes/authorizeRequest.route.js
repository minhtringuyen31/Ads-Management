import express from 'express';
import AuthorizeRequestController from '../controllers/authorizeRequest.controller.js';
import uploadCloud from '../middlewares/uploader.js';
const router = express.Router();

router.get('/authorizeRequests', AuthorizeRequestController.getAll);
router.get('/authorizeRequest/:id', AuthorizeRequestController.getById);
router.post('/authorizeRequest', uploadCloud.array('new_ads_board.image'), AuthorizeRequestController.create);
router.put('/authorizeRequest/:id', uploadCloud.array('new_ads_board.image'), AuthorizeRequestController.update);
router.delete('/authorizeRequest/:id', AuthorizeRequestController.delete);

export default router;
