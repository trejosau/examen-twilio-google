import { Request, Response } from 'express';
import { TwilioService } from '../services/twilio.service';
import { formatResponse } from '../utils/responseFormatter';

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

            await TwilioService.sendMessage(phoneNumber, message);
            res.status(200).json(formatResponse('success', 'Mensaje enviado correctamente'));
        }
        catch (error) {
            res.status(400).json(formatResponse('error', 'Error al enviar mensaje', error instanceof Error ? error.message : error));
        }
    }
}