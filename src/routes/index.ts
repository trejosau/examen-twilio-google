import { Router } from 'express';
import userRoutes from './user.routes';
import salonRoutes from './salon.routes';
import reservationRoutes from './reservation.routes';

const router = Router();

// Definición de rutas base
router.use('/users', userRoutes);
router.use('/salons', salonRoutes);
router.use('/reservations', reservationRoutes);

export default router;