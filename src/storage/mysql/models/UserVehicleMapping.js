import { Model, DataTypes } from 'sequelize';
import { Vehicle } from './Vehicle';
import { User } from './User'
import { SQLWrite } from '../index';

export class UserVehicleMapping extends Model { }

UserVehicleMapping.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
	},
	vehicleId: {
		type: DataTypes.INTEGER
	}
}, {
	sequelize: SQLWrite,
	freezeTableName: true,
	tableName: 'users_vehicles_mappings',
	underscored: true,
})

UserVehicleMapping.belongsTo(User, { onUpdate: 'cascade', hooks: true });
UserVehicleMapping.belongsTo(Vehicle, { onUpdate: 'cascade', hooks: true });


