import  User from '../models/User.model';
import {UserAttributes} from "../types/models/user";
import {UserCreationAttributes} from "../types/models/user";
import {UpdateUserAttributes} from "../types/models/user";

export class UserRepository {

    static async create(userData: UserCreationAttributes) {
        try {
            return await User.create(userData);
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    static async findById(userId: string) {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    static async findByUsername(username: string) {
        try {
            return await User.findOne({ where: { username } });
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    static async findAll() {
        try {
            return await User.findAll();
        } catch (error) {
            console.error('Error fetching users:', error);
            return null;
        }
    }

    static async update(userData: UpdateUserAttributes) {
        try {
            await User.update(userData, {
                where: { id: userData.id },
            });

            return await User.findOne({ where: { id: userData.id } });
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }

}
