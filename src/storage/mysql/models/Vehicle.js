import { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '../index';

export class Vehicle extends Model { }

Vehicle.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
	},
	model: {
		type: DataTypes.STRING,
	},
	numberPlate: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	}
}, {
	sequelize: SQLWrite,
	freezeTableName: true,
	tableName: 'vehicles',
	underscored: true,
});