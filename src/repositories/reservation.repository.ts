import  Reservation from '../models/Reservation.model';
import {ReservationAttributes} from "../types/models/reservation";
import {ReservationCreationAttributes, ReservationUpdateAtributes} from "../types/models/reservation";

export class ReservationRepository {
    static async create(reservationData: ReservationCreationAttributes) {
        try {
            return await Reservation.create(reservationData);
        } catch (error) {
            console.error('Error creating reservation:', error);
            return null;
        }
    }

    static async findAll() {
        try {
            return await Reservation.findAll();
        } catch (error) {
            console.error('Error fetching reservations:', error);
            return null;
        }
    }

    static async findById(id: string) {
        try {
            return await Reservation.findByPk(id);
        } catch (error) {
            console.error('Error fetching reservation:', error);
            return null;
        }
    }
    static async update(reservationData: ReservationUpdateAtributes) {
        try {
            return await Reservation.update(reservationData, {
                where: {id: reservationData.id},
                returning: true,
            });
        } catch (error) {
            console.error('Error updating reservation:', error);
            return null;
        }
    }

    static async delete(id: string) {
        try {
            return await Reservation.destroy({
                where: {id: id},
            });
        } catch (error) {
            console.error('Error deleting reservation:', error);
            return null;
        }
    }
}