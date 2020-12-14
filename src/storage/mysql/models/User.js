import { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '../index';

export class User extends Model { }

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
	},
	adharNumber: {
		type: DataTypes.STRING(20),
		unique: true,
	},
}, {
	sequelize: SQLWrite,
	freezeTableName: true,
	tableName: 'users',
	timestamps: true,
	underscored: true,
});