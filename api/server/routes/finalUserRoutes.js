import { Router } from 'express';
import FinalUserController from '../controllers/finalUserController';

const router = Router();

router.get('/', FinalUserController.getAllFinalUsers);
router.post('/', FinalUserController.addFinalUser);
router.get('/:id', FinalUserController.getAFinalUser);
router.put('/:id', FinalUserController.updatedFinalUser);
router.delete('/:id', FinalUserController.deleteFinalUser);

export default router;