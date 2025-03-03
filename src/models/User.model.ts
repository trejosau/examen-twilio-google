import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { UserAttributes, UserCreationAttributes } from '../types/models/user';

class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string;
    public username!: string;
    public password!: string;
    public numeroTelefono!: string;
    public role!: 'admin' | 'user';
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numeroTelefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

export default User;