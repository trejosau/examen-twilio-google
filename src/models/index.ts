import User from './User.model';
import Salon from './Salon.model';
import Reservation from './Reservation.model';

// Relación: Un usuario puede tener muchas reservas
User.hasMany(Reservation, { foreignKey: 'clientId' });
Reservation.belongsTo(User, { foreignKey: 'clientId' });

// Relación: Un salón puede tener muchas reservas
Salon.hasMany(Reservation, { foreignKey: 'salonId' });
Reservation.belongsTo(Salon, { foreignKey: 'salonId' });