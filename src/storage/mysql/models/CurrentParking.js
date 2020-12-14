import { Model, DataTypes } from 'sequelize';
import { SQLWrite } from '..';
import { ParkingLot } from './ParkingLot';
import { ParkingSlot } from './ParkingSlot';
import { Vehicle } from './Vehicle';
import { Token } from './Token';

export class CurrentParking extends Model { }

CurrentParking.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	tokenId: DataTypes.INTEGER,
	vehicleId: DataTypes.INTEGER,
	parkingLotId: DataTypes.INTEGER,
	parkingSlotId: DataTypes.INTEGER,
	parkingTime: DataTypes.DATE,
	releaseTime: DataTypes.DATE,
}, {
	sequelize: SQLWrite,
	tableName: 'current_parkings',
	timestamps: true,
	underscored: true,
});

CurrentParking.belongsTo(ParkingLot);
CurrentParking.belongsTo(ParkingSlot);
CurrentParking.belongsTo(Vehicle);
CurrentParking.belongsTo(Token);