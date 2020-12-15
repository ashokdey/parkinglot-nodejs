import Sequelize, { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '../index';

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
		type: DataTypes.ENUM(['ACTIVE', 'MAINTAINANCE', 'INACTIVE']),
		defaultValue: 'ACTIVE',
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
