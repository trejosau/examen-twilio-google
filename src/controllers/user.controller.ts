import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { formatResponse } from '../utils/responseFormatter';


export const UserController = {
    async loginUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new Error('Faltan datos');
            }

            // Iniciar sesión del usuario
            const newUser = await UserService.loginUser({ username, password });

            res.status(200).json(formatResponse('success', 'Usuario logueado correctamente', newUser));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al loguear el usuario', error instanceof Error ? error.message : error));
        }
    },

    async registerAdmin(req: Request, res: Response){
        try {
            const {username, password, numeroTelefono} = req.body;
            if (!username || !password || !numeroTelefono) {
                throw new Error('Faltan datos');
            }
            const user = await UserService.createUser({username, password, numeroTelefono, role: "admin"});
            res.status(200).json(formatResponse('success', 'Usuario registrado correctamente', user));
        }
        catch(error){
            res.status(400).json(formatResponse('error', 'Error al registrar el usuario', error instanceof Error ? error.message : error));
        }
    },

    async register(req: Request, res: Response){
        try {
            const {username, password, numeroTelefono} = req.body;
            if (!username || !password || !numeroTelefono) {
                throw new Error('Faltan datos');
            }
            const user = await UserService.createUser({username, password, numeroTelefono, role: "user"});
            res.status(200).json(formatResponse('success', 'Usuario registrado correctamente', user));
        }
        catch(error){
            res.status(400).json(formatResponse('error', 'Error al registrar el usuario', error instanceof Error ? error.message : error));
        }
    },
    async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getUsers();
            res.status(200).json(formatResponse('success', 'Usuarios obtenidos correctamente', users));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al obtener los usuarios', error instanceof Error ? error.message : error));
        }
    },
    async updateUser(req: Request, res: Response) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                throw new Error('El usuario no existe');
            }
            const {username, password, numeroTelefono} = req.body;
            if (!username || !password || !numeroTelefono) {
                throw new Error('Faltan datos');
            }
            const updatedUser = await UserService.updateUser({id: user.id, username, password, numeroTelefono});
            res.status(200).json(formatResponse('success', 'Usuario actualizado correctamente', updatedUser));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al actualizar el usuario', error instanceof Error ? error.message : error));
        }
    }
};