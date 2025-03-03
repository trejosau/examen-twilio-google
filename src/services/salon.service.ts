import { SalonRepository } from "../repositories/salon.repository";
import { SalonCreationAttributes } from "../types/models/salon";
import { UpdateSalonAttributes } from "../types/models/salon";

export const SalonService = {
    async createSalon(credentials: SalonCreationAttributes) {
        const { name, capacity, location, coordinates } = credentials;
        // Validar que los datos sean correctos
        if (!name || !capacity || !location || !coordinates) {
            throw new Error('Faltan datos');
        }
        return SalonRepository.create({ name, capacity, location, coordinates});
    },

    async getSalons() {
        return SalonRepository.findAll();
    },

    async getSalonById(id: string) {
        return SalonRepository.findById(id);
    },
    async updateSalon(credentials: UpdateSalonAttributes) {
        const { id, name, capacity, location, coordinates } = credentials;
        return SalonRepository.update({ id, name, capacity, location, coordinates});
        }
}