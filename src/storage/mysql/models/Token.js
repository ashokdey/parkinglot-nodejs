import { Model, DataTypes } from 'sequelize';
import { User } from './User'
import { SQLWrite } from '../index';

export class Token extends Model { }

Token.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	token: {
		type: DataTypes.STRING,
	},
	userId: {
		type: DataTypes.INTEGER
	}
}, {
	sequelize: SQLWrite,
	freezeTableName: true,
	tableName: 'tokens',
	timestamps: true,
	underscored: true,
})

Token.belongsTo(User, { onUpdate: 'cascade', hooks: true });


