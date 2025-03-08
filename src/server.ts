import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

import './config/mqtt.config';
import app from './app';
import sequelize from './config/db.config';
import './models/User.model';
import './models/Salon.model';
import './models/Reservation.model';

const PORT = process.env.PORT || 15754;

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');

        await sequelize.sync({ alter: false });
        console.log('Tables synchronized.');

        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

startServer();

export const getIO = () => io;
