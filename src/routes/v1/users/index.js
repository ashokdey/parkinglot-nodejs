import { Router } from 'express';
import { User } from '../../../storage/mysql/models/User';
import { ParkingManager } from '../../../storage/mysql/models/ParkingManager';
import { UserVehicleMapping } from '../../../storage/mysql/models/UserVehicleMapping';

export const userRoutes = Router();

userRoutes.post('/', async (req, res, next) => {
	/** get the name and adhar card number of a user and register him */
	try {
		const { name, adharNumber } = req.body;
		const user = await User.create({
			name,
			adharNumber,
		});
		return res.status(201).json({ user });
	} catch (err) {
		next(new Error(err));
	}
});

userRoutes.post('/managers', async (req, res, next) => {
	/** create a new manager using user id and adhar number */
	try {
		const { userId } = req.body;
		const manager = await ParkingManager.create({
			userId
		});
		return res.status(201).json({ manager });
	} catch (err) {
		next(new Error(err));
	}
});

userRoutes.post('/purchases/vehicles', async (req, res, next) => {
	/** create a vehicle for the user and return the response */
	try {
		const { vehicleId, userId } = req.body;
		await UserVehicleMapping({ vehicleId, userId });
		return res.status(201).json({ msg: 'success' });
	} catch (err) {
		return next(new Error(err));
	}
});

userRoutes.get('/', async (req, res, next) => {
	/** get all the users */
	try {
		const users = await User.findAll();
		res.status(200).json({ users });
	} catch (err) {
		next(new Error(err));
	}
});

userRoutes.get('/adhar/:adharNumber', async (req, res, next) => {
	/** user adhar card to find the user and return if exists */
	try {
		const { adharNumber } = req.params;
		const user = await User.findOne({ adharNumber });
		return res.status(200).json({ user });
	} catch (err) {
		next(new Error(err));
	}
});