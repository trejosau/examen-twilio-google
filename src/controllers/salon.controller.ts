import { Request, Response } from 'express';
import { SalonService } from '../services/salon.service';
import { formatResponse } from '../utils/responseFormatter';
import { getLocationFromCoordinates } from '../utils/geocoding'; // Función auxiliar asumida

export const SalonController = {
    async createSalon(req: Request, res: Response) {
        try {
            // Extraer datos del cuerpo de la solicitud
            const {name, capacity, coordinates} = req.body;
            // Validar que todos los datos requeridos estén presentes
            if (!name || !capacity || !coordinates) {
                throw new Error('Faltan datos');
            }

            // Convertir coordenadas a ubicación usando una función auxiliar
            const location = await getLocationFromCoordinates(coordinates);
            const coordinatesString = `${coordinates.lat}, ${coordinates.lng}`;
            console.log(coordinatesString, "texto")
            const salon = await SalonService.createSalon({name, capacity, location, coordinates: coordinatesString});

            // Responder con éxito
            res.status(200).json(formatResponse('success', 'Salón creado correctamente', salon));
        } catch (error) {
            // Manejar errores y responder con un mensaje adecuado
            res.status(400).json(formatResponse('error', 'Error al crear el salón', error instanceof Error ? error.message : error));
        }
    },
    async getSalons(req: Request, res: Response) {
        try {
            // Obtener todos los salones
            const salons = await SalonService.getSalons();

            // Responder con los salones
            res.status(200).json(formatResponse('success', 'Salones obtenidos correctamente', salons));
        } catch (error) {
            // Manejar errores y responder con un mensaje adecuado
            res.status(400).json(formatResponse('error', 'Error al obtener los salones', error instanceof Error ? error.message : error));
        }
    },
    async getSalonById(req: Request, res: Response) {
        try {
            // Obtener el salón por ID
            const salon = await SalonService.getSalonById(req.params.id);

            // Responder con el salón
            res.status(200).json(formatResponse('success', 'Salón obtenido correctamente', salon));
        } catch (error) {
            // Manejar errores y responder con un mensaje adecuado
            res.status(400).json(formatResponse('error', 'Error al obtener el salón', error instanceof Error ? error.message : error));
        }
    },

    async updateSalon(req: Request, res: Response) {
        try {
            // Obtener el salón por ID
            const salon = await SalonService.getSalonById(req.params.id);

            // Validar que el salón exista
            if (!salon) {
                throw new Error('El salón no existe');
            }

            // Extraer datos del cuerpo de la solicitud
            const {name, capacity, coordinates} = req.body;

            // Validar que todos los datos requeridos estén presentes
            if (!name || !capacity || !coordinates) {
                throw new Error('Faltan datos');
            }

            // Convertir coordenadas a ubicación usando una función auxiliar
            const location = await getLocationFromCoordinates(coordinates);
            const coordinatesString = `${coordinates.lat}, ${coordinates.lng}`;

            // Actualizar el salón usando el servicio correspondiente
            const updatedSalon = await SalonService.updateSalon({id: salon.id, name, capacity, location, coordinates: coordinatesString});

            res.status(200).json(formatResponse('success', 'Salón actualizado correctamente', `El salón '${req.params.id}' ha sido actualizado correctamente`));

        } catch (error) {
            // Manejar errores y responder con un mensaje adecuado
            res.status(400).json(formatResponse('error', 'Error al actualizar el salón', error instanceof Error ? error.message : error));
        }
    }
};