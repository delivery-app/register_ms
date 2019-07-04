import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.addUser);
router.get('/:id', UserController.getAUser);
router.put('/:id', UserController.updatedUser);
router.delete('/:id', UserController.deleteUser);
router.post('/check_user', UserController.isUser);

export default router;1