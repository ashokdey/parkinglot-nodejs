import { Router } from 'express';
import { Vehicle } from '../../../storage/mysql/models/Vehicle';

export const vehiclesRoutes = Router();

vehiclesRoutes.post('/', async (req, res, next) => {
	/** create a new vehicle */
	try {
		const { name, model, numberPlate, vehicleTypeId } = req.body;
		const vehicle = await Vehicle.create({
			name, model, numberPlate, vehicleTypeId
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

