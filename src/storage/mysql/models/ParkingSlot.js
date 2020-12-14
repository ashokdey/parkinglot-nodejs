import { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '..';
import { ParkingLot } from './ParkingLot';
import { Vehicle } from './Vehicle';

export class ParkingSlot extends Model { }

ParkingSlot.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	slotNumber: DataTypes.INTEGER,
	slotStatus: {
		type: DataTypes.ENUM(['FREE', 'BOOKED']),
		defaultValue: 'FREE',
	},
	vehicleId: {
		type: DataTypes.INTEGER,
	},
	parkingLotId: DataTypes.INTEGER,
}, {
	sequelize: SQLWrite,
	tableName: 'parking_slots',
	timestamps: true,
	underscored: true,
});

ParkingSlot.belongsTo(ParkingLot, { onUpdate: 'cascade', hooks: true });
ParkingSlot.belongsTo(Vehicle, { onUpdate: 'cascade', hooks: true });