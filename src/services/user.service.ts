import bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/user.repository";
import { LoginCredentials, UserCreationAttributes, UpdateUserAttributes } from "../types/models/user";

import { generateToken } from '../utils/jwt';

export const UserService = {



    async loginUser(credentials: LoginCredentials) {
        const { username, password } = credentials;
        const user = await UserRepository.findByUsername(username);
        if (!user) {
            throw new Error('El usuario no existe');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }
        return { user, token: generateToken(user.id, user.role) };
    },

    async getPhoneNumber(userId: string) {
        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new Error('El usuario no existe');
        }
        return user.numeroTelefono;
    },

    async createUser(credentials: UserCreationAttributes) {
        const { username, password, numeroTelefono, role = "user" } = credentials;

        const userExists = await UserRepository.findByUsername(username);
        if (userExists) {
            throw new Error("El nombre de usuario ya está en uso");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserRepository.create({ username, password: hashedPassword, numeroTelefono, role });

        return user;
    },

    async getUsers() {
        return UserRepository.findAll();
    },
    async getUserById(id: string) {
        return UserRepository.findById(id);
    },
    async updateUser(credentials: UpdateUserAttributes) {
        const { id, username, password, numeroTelefono } = credentials;
        return UserRepository.update({ id, username, password, numeroTelefono});
        }



}