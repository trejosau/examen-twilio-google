// src/types/models/reservation.ts
export interface Reservation {
    id: string;
    salonId: string;
    clientId: string;
    type: string;
    numeroDePersonas: number;
    date: Date;
    time: string;
    status: 'pending' | 'confirmed' | 'canceled';
}

export interface ReservationCreationAttributes {
    salonId: string;
    clientId: string;
    type: string;
    numeroDePersonas: number;
    date: Date;
    time: string;
    status: 'pending';
}

export interface ReservationAttributes {
    id: string;
    salonId: string;
    clientId: string;
    type: string;
    numeroDePersonas: number;
    date: Date;
    time: string;
    status: 'pending' | 'confirmed' | 'canceled';
}

export interface ReservationUpdateAtributes {
    id: string;
    status: 'pending' | 'confirmed' | 'canceled';
}