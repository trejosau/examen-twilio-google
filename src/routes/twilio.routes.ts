import { Router } from 'express';
import { twilioController } from '../controllers/twilio.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
//twilio.routes.ts
router.post('/message', authMiddleware(['admin', 'user']), twilioController.sendMessage);

export default router;