import { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '..';
import { ParkingLot } from './ParkingLot';
import { ParkingManager } from './ParkingManager';

export class ParkingManagerParkingLotMapping extends Model { }

ParkingManagerParkingLotMapping.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	parkingManagerId: {
		type: DataTypes.INTEGER,
	},
	parkingLotId: {
		type: DataTypes.INTEGER,
	}
}, {
	sequelize: SQLWrite,
	tableName: 'parking_lot_parking_manager_mappings',
	timestamps: true,
	underscored: true,
});

ParkingManagerParkingLotMapping.belongsTo(ParkingLot, { onUpdate: 'cascade', hooks: true });
ParkingManagerParkingLotMapping.belongsTo(ParkingManager, { onUpdate: 'cascade', hooks: true });