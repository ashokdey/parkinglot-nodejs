import Sequelize, { Model, DataTypes } from 'sequelize';
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
	tableName: 'users',
	timestamps: true,
	underscored: true,
});