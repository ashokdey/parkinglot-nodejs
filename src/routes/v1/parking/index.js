import { Router } from 'express';
import { Vehicle } from '../../../storage/mysql/models/Vehicle';

export const parkingRoutes = Router();

parkingRoutes.post('/parkingLotId', async (req, res, next) => {
	/** create a new parking */

	/**
	 * get parkingId & vehicleId
	 * find the nearest parking slot using Parking Id
	 * throw error if parking not are used up or not available
	 * create a parking using the parking slot
	 * return the token, slotDetails and parking lot details
	 */
	try {
		const { name, model, numberPlate, vehicleTypeId } = req.body;
		const parking = await Vehicle.create({
			name, model, numberPlate, vehicleTypeId
		});

		return res.status(201).json({ parking });
	} catch (err) {
		return next(new Error(err));
	}
});

parkingRoutes.post('/parkingLotId', async (req, res, next) => {
	/** create a new parking */

	/**
	 * get token
	 * find the details from current parking using token
	 * find the nearest parking slot using Parking Id
	 * create a parking using the parking slot
	 * return the FEES, slotDetails and parking lot details
	 */
	try {
		const { name, model, numberPlate, vehicleTypeId } = req.body;
		const parking = await Vehicle.create({
			name, model, numberPlate, vehicleTypeId
		});

		return res.status(201).json({ parking });
	} catch (err) {
		return next(new Error(err));
	}
});


parkingRoutes.get('/:parkingLotId', async (req, res, next) => {
	/** fetch all the parking slots details of a parking lot */
	try {
		const vehicles = await Vehicle.findAll();
		return res.status(200).json({ vehicles });
	} catch (err) {
		return next(new Error(err));
	}
});

