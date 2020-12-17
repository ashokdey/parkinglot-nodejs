import Sequelize, { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '..';
import { PARKING_SLOT_STATUS } from '../../../constants';
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
		type: DataTypes.ENUM([
			PARKING_SLOT_STATUS.BOOKED,
			PARKING_SLOT_STATUS.FREE
		]),
		defaultValue: PARKING_SLOT_STATUS.FREE,
	},
	vehicleId: {
		type: DataTypes.INTEGER,
	},
	parkingLotId: DataTypes.INTEGER,
	isActive: DataTypes.TINYINT,
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