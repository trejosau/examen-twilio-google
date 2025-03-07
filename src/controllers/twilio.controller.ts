import { Request, Response } from 'express';
import { formatResponse } from '../utils/responseFormatter';
import Twilio from 'twilio';

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const twilioController = {
    async sendMessage(req: Request, res: Response) {
        try {
            const { phoneNumber, message } = req.body;
            if (!phoneNumber) {
                throw new Error('Faltan el número de teléfono');
            }
            if (!message) {
                throw new Error('Falta el mensaje');
            }

            await twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });
            res.status(200).json(formatResponse('success', 'Mensaje enviado correctamente'));
        }
        catch (error) {
            res.status(400).json(formatResponse('error', 'Error al enviar mensaje', error instanceof Error ? error.message : error));
        }
    }
};