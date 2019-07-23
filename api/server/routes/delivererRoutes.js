import { Router } from 'express';
import DelivererController from '../controllers/delivererController';

const router = Router();

router.get('/', DelivererController.getAllDeliverers);
router.post('/', DelivererController.addDeliverer);
router.get('/:id', DelivererController.getADeliverer);
router.put('/:id', DelivererController.updatedDeliverer);
router.delete('/:id', DelivererController.deleteDeliverer);

export default router;