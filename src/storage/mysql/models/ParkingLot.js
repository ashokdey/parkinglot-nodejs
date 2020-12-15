import Sequelize, { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '../index';
import { PARKING_LOT_STATUS } from '../../../constants';

export class ParkingLot extends Model { }

ParkingLot.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	slotSize: {
		type: DataTypes.INTEGER,
	},
	bookedSlots: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	mode: {
		type: DataTypes.ENUM([
			PARKING_LOT_STATUS.ACTIVE,
			PARKING_LOT_STATUS.MAINTAINANCE,
			PARKING_LOT_STATUS.INACTIVE
		]),
		defaultValue: PARKING_LOT_STATUS.ACTIVE,
	},
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
	freezeTableName: true,
	tableName: 'parking_lots',
	underscored: true,
});
