import Sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '..';
import { CURRENT_PARKING_STATUS } from '../../../constants';
import { ParkingLot } from './ParkingLot';
import { ParkingSlot } from './ParkingSlot';
import { Vehicle } from './Vehicle';

export class CurrentParking extends Model { }

CurrentParking.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	token: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	vehicleId: DataTypes.INTEGER,
	parkingLotId: DataTypes.INTEGER,
	parkingSlotId: DataTypes.INTEGER,
	parkingTime: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
	},
	releaseTime: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: null,
	},
	fees: {
		type: DataTypes.FLOAT,
		allowNull: true,
		defaultValue: null,
	},
	status: {
		type: DataTypes.ENUM([
			CURRENT_PARKING_STATUS.PARKED,
			CURRENT_PARKING_STATUS.UNPARKED,
		]),
		defaultValue: CURRENT_PARKING_STATUS.PARKED
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
	tableName: 'current_parkings',
	underscored: true,
});

CurrentParking.belongsTo(ParkingLot);
CurrentParking.belongsTo(ParkingSlot);
CurrentParking.belongsTo(Vehicle);
