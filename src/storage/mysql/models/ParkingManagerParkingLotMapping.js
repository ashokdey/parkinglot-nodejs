import Sequelize, { Model, DataTypes } from 'sequelize';
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
	tableName: 'parking_lot_parking_manager_mappings',
	underscored: true,
});

ParkingManagerParkingLotMapping.belongsTo(ParkingLot, { onUpdate: 'cascade', hooks: true });
ParkingManagerParkingLotMapping.belongsTo(ParkingManager, { onUpdate: 'cascade', hooks: true });