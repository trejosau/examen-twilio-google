import { Router } from 'express';
import { ReservationController } from '../controllers/reservation.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post('/', authMiddleware(['admin']), ReservationController.createReservation);
router.get('/', authMiddleware(['admin', 'user']), ReservationController.getReservations);
router.put('/:id', authMiddleware(['admin']), ReservationController.updateReservation);
router.delete('/:id', authMiddleware(['admin']), ReservationController.deleteReservation);


export default router;