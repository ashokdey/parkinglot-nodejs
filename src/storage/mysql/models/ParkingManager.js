import { Model, DataTypes } from 'sequelize';
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
	name: {
		type: DataTypes.STRING(20),
	},
	userId: {
		type: DataTypes.INTEGER,
	}
}, {
	sequelize: SQLWrite,
	tableName: 'parking_managers',
	timestamps: true,
	underscored: true,
});

ParkingManager.belongsTo(User, { onUpdate: 'cascade', hooks: true });