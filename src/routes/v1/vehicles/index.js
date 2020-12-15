import { Router } from 'express';
import { Vehicle } from '../../../storage/mysql/models/Vehicle';
import { UserVehicleMapping } from '../../../storage/mysql/models/UserVehicleMapping';

export const vehiclesRoutes = Router();

vehiclesRoutes.post('/', async (req, res, next) => {
	/** create a new vehicle */
	try {
		const { name, model, numberPlate, vehicleTypeId, ownerId, } = req.body;

		/** TODO: // init transaction */
		const vehicle = await Vehicle.create({
			name, model, numberPlate, vehicleTypeId
		});
		const vehicleId = vehicle.getDataValue('id');

		/** map the vehicle to the user */
		await UserVehicleMapping.create({
			userId: ownerId,
			vehicleId
		});

		return res.status(201).json({ vehicle });
	} catch (err) {
		return next(new Error(err));
	}
});

vehiclesRoutes.get('/', async (req, res, next) => {
	/** fetch all the vehicles */
	try {
		const vehicles = await Vehicle.findAll();
		return res.status(200).json({ vehicles });
	} catch (err) {
		return next(new Error(err));
	}
});

