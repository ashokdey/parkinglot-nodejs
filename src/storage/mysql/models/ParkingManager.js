import Sequelize, { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '..';
import { User } from './User';

export class ParkingManager extends Model { }

ParkingManager.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
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
	tableName: 'parking_managers',
	timestamps: true,
	underscored: true,
});

ParkingManager.belongsTo(User, { onUpdate: 'cascade', hooks: true });