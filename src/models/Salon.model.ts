import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { SalonAttributes, SalonCreationAttributes } from '../types/models/salon';

class Salon extends Model<SalonAttributes, SalonCreationAttributes> {
    public id!: string;
    public name!: string;
    public coordinates!: string;
    public location!: string;
    public capacity!: number;
}

Salon.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coordinates: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'salons',
        timestamps: false,
    }
);

export default Salon;