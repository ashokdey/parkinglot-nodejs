import { Router } from 'express';
import { User } from '../../../storage/mysql/models/User';

export const userRoutes = Router();

/** create a new user */
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

/** fetch all the users */
userRoutes.get('/', async (req, res, next) => {
	/** get all the users */
	try {
		const users = await User.findAll({
			attributes: { exclude: ['created_at', 'updated_at'] },
		});
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