import Sequelize, { Model, DataTypes } from 'sequelize';
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
	slotNumber: DataTypes.STRING,
	slotStatus: {
		type: DataTypes.ENUM(['FREE', 'BOOKED']),
		defaultValue: 'FREE',
	},
	vehicleId: {
		type: DataTypes.INTEGER,
	},
	parkingLotId: DataTypes.INTEGER,
	created_at: {
		type: 'TIMESTAMP',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	},
	updated_at: {
		type: 'TIMESTAMP',
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	}
}, {
	sequelize: SQLWrite,
	tableName: 'parking_slots',
	underscored: true,
});

ParkingSlot.belongsTo(ParkingLot, { onUpdate: 'cascade', hooks: true });
ParkingSlot.belongsTo(Vehicle, { onUpdate: 'cascade', hooks: true });