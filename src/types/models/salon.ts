// src/types/models/salon.ts
export interface Salon {
    id: string;
    name: string;
    capacity: number;
    coordinates: string;
    location: string;
}

export interface SalonCreationAttributes {
    name: string;
    capacity: number;
    location: string;
    coordinates: string;
}

export interface SalonAttributes {
    id: string;
    name: string;
    capacity: number;
    coordinates: string;
    location: string;
}

export interface UpdateSalonAttributes {
    id: string;
    name: string;
    capacity: number;
    location: string;
    coordinates: string;
}