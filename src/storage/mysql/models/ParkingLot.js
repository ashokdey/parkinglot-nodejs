import { Model, DataTypes } from 'sequelize';
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
}, {
	sequelize: SQLWrite,
	freezeTableName: true,
	tableName: 'parking_lots',
	timestamps: true,
	underscored: true,
});
