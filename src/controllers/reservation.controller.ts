import { Request, Response } from 'express';
import { ReservationService } from '../services/reservation.service';
import { formatResponse } from '../utils/responseFormatter';
import Twilio from 'twilio';
import {UserService} from "../services/user.service"; // Importamos Twilio

// Inicializamos el cliente de Twilio con las credenciales del entorno
const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const ReservationController = {
    async createReservation(req: Request, res: Response) {
        try {
            const { salonId, clientId, type, numeroDePersonas, date, time } = req.body;

            // Validamos que todos los campos necesarios estén presentes
            if (!salonId || !clientId || !type || !numeroDePersonas || !date || !time) {
                throw new Error('Faltan datos');
            }

            // Creamos la reserva usando el servicio
            const reservation = await ReservationService.createReservation({
                salonId,
                clientId,
                type,
                numeroDePersonas,
                date,
                time,
                status: "pending"
            });

            const phoneNumber = await UserService.getPhoneNumber(clientId);
            
            if (!reservation) {
                throw new Error('Error al crear la reserva');
            }
            const message = `Tu reservación ha sido confirmada. ID: ${reservation.id}, Fecha: ${date}, Hora: ${time}`;
            await twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });

            // Respondemos con éxito
            res.status(200).json(formatResponse('success', 'Reserva creada correctamente', reservation));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al crear la reserva', error instanceof Error ? error.message : error));
        }
    },
    async getReservations(req: Request, res: Response) {
        try {
            // Obtenemos todas las reservas
            const reservations = await ReservationService.getReservations();

            // Respondemos con las reservas
            res.status(200).json(formatResponse('success', 'Reservas obtenidas correctamente', reservations));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al obtener las reservas', error instanceof Error ? error.message : error));
        }
    },
    async updateReservation(req: Request, res: Response) {
        try {
            const { id, status } = req.body;

            // Validamos que el ID de la reserva esté presente
            if (!id) {
                throw new Error('Falta el ID de la reserva');
            }

            // Obtenemos la reserva por ID
            const reservation = await ReservationService.getReservationById(id);

            // Validamos que la reserva exista
            if (!reservation) {
                throw new Error('La reserva no existe');
            }


            // Actualizamos la reserva
            const updatedReservation = await ReservationService.updateReservation({
                id,
                status
            });

            // Respondemos con éxito
            res.status(200).json(formatResponse('success', 'Reserva actualizada correctamente', updatedReservation));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al actualizar la reserva', error instanceof Error ? error.message : error));
        }
    },
    async deleteReservation(req: Request, res: Response) {
        try {
            const { id } = req.body;

            // Validamos que el ID de la reserva esté presente
            if (!id) {
                throw new Error('Falta el ID de la reserva');
            }

            // Obtenemos la reserva por ID
            const reservation = await ReservationService.getReservationById(id);

            // Validamos que la reserva exista
            if (!reservation) {
                throw new Error('La reserva no existe');
            }

            // Eliminamos la reserva
            const deletedReservation = await ReservationService.deleteReservation(id);

            // Respondemos con éxito
            res.status(200).json(formatResponse('success', 'Reserva eliminada correctamente', deletedReservation));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al eliminar la reserva', error instanceof Error ? error.message : error));
        }
    }
};