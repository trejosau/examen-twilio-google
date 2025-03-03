import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post('/login', UserController.loginUser);
router.get('/',authMiddleware(['admin']), UserController.getUsers);
router.put('/:id', authMiddleware(['admin']), UserController.updateUser);
router.post('/register', UserController.register);
router.post('/register-admin', authMiddleware(['admin']), UserController.registerAdmin);


export default router;
