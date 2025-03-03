import  Salon from '../models/Salon.model';
import {SalonAttributes} from "../types/models/salon";
import {SalonCreationAttributes} from "../types/models/salon";
import {UpdateSalonAttributes} from "../types/models/salon";

export class SalonRepository {
    static async create(salonData: SalonCreationAttributes) {
        try {
            console.log("hola")
            return await Salon.create(salonData);
        } catch (error) {
            console.error('Error creating salon:', error);
            return null;
        }
    }

    static async findAll() {
        try {
            return await Salon.findAll();
        } catch (error) {
            console.error('Error fetching salons:', error);
            return null;
        }
    }

    static async findById(id: string) {
        try {
            return await Salon.findByPk(id);
        } catch (error) {
            console.error('Error fetching salon:', error);
            return null;
        }
    }
    static async update(salonData: UpdateSalonAttributes) {
        try {
            return await Salon.update(salonData, {
                where: {id: salonData.id},
                returning: true,
            });
        } catch (error) {
            console.error('Error updating salon:', error);
            return null;
        }
    }
}