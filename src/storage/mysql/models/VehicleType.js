import { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '../index';

export class VehicleType extends Model { }

VehicleType.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	vehicleType: {
		type: DataTypes.STRING,
		unique: true,
	},
	slotRequired: {
		type: DataTypes.TINYINT,
	}
}, {
	sequelize: SQLWrite,
	freezeTableName: true,
	tableName: 'vehicle_types',
	timestamps: true,
	underscored: true,
});
