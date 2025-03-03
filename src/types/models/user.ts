// src/types/models/user.ts
export interface User {
    id: string;
    username: string;
    password: string;
    numeroTelefono: string;
    role: 'admin' | 'user';
}

export interface UserCreationAttributes {
    username: string;
    password: string;
    numeroTelefono: string;
    role: 'admin' | 'user';
}

export interface UserAttributes {
    id: string;
    username: string;
    password: string;
    numeroTelefono: string;
    role: 'admin' | 'user';
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface UpdateUserAttributes {
    id: string;
    username: string;
    password: string;
    numeroTelefono: string;
}