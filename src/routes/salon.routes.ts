import { Router } from 'express';
import { SalonController } from '../controllers/salon.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post('/', authMiddleware(['admin']), SalonController.createSalon);
router.get('/', authMiddleware(['admin', 'user']), SalonController.getSalons);
router.get('/:id', authMiddleware(['admin', 'user']), SalonController.getSalonById);
router.put('/:id', authMiddleware(['admin']), SalonController.updateSalon);

export default router;