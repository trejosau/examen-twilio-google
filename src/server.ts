// src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import sequelize from './config/db.config';

import './models/User.model';
import './models/Salon.model';
import './models/Reservation.model';

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        await sequelize.sync({ alter: false })
            .then(() => console.log('Tablas creadas o actualizadas correctamente'))
            .catch((error) => console.error('Error al crear las tablas:', error));

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error en la conexión a la base de datos:', error);
    }
};

startServer();