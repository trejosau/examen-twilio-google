import { ReservationRepository } from "../repositories/reservation.repository";
import { ReservationCreationAttributes, ReservationUpdateAtributes } from "../types/models/reservation";

export const ReservationService = {
    async createReservation(credentials: ReservationCreationAttributes) {
        const { salonId, clientId, type, numeroDePersonas, date, time, status } = credentials;

        return ReservationRepository.create({ salonId, clientId, type, numeroDePersonas, date, time, status});
    },
    async getReservations() {
        return ReservationRepository.findAll();
    },
    async getReservationById(id: string) {
        return ReservationRepository.findById(id);
    },
    async updateReservation(credentials: ReservationUpdateAtributes) {
        const {id, status} = credentials;
        return ReservationRepository.update({id, status});
    },
    async deleteReservation(id: string) {
        return ReservationRepository.delete(id);
    }
}