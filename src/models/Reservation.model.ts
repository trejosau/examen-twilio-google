import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';
import { ReservationAttributes, ReservationCreationAttributes } from '../types/models/reservation';

class Reservation extends Model<ReservationAttributes, ReservationCreationAttributes> {
    public id!: string;
    public salonId!: string;
    public clientId!: string;
    public type!: string;
    public numeroDePersonas!: number;
    public date!: Date;
    public time!: string;
    public status!: 'pending' | 'confirmed' | 'canceled';
}

Reservation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        salonId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'salons',
                key: 'id',
            },
        },
        clientId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numeroDePersonas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'reservations',
        timestamps: false,
    }
);

export default Reservation;