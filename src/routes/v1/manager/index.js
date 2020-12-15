import Sequelize from 'sequelize';
import { Router } from 'express';
import { ParkingLot } from '../../../storage/mysql/models/ParkingLot';
import { ParkingManager } from '../../../storage/mysql/models/ParkingManager';
import { ParkingManagerParkingLotMapping } from '../../../storage/mysql/models/ParkingManagerParkingLotMapping';

export const managerRoutes = Router();

/** create a manager */
managerRoutes.post('/', async (req, res, next) => {
	/** create a new manager using user id and adhar number */
	try {
		const { userId } = req.body;
		const manager = await ParkingManager.create({
			userId
		});
		/** TODO: join with user data and send */
		return res.status(201).json({ manager });
	} catch (err) {
		next(new Error(err));
	}
});

/** fetch all the managers */
managerRoutes.get('/', async (req, res, next) => {
	try {
		const managers = await ParkingManager.findAll({});
		return res.status(200).json({ managers });
	} catch (err) {
		return next(new Error(err));
	}
});

/** fetch all the parking lots of the manager using manager Id */
managerRoutes.get('/:parkingManagerId/parkinglots', async (req, res, next) => {
	try {
		let parkingManagerId = null;
		if (req.params.parkingManagerId) {
			parkingManagerId = Number(req.params.parkingManagerId);
		}
		if (typeof parkingManagerId !== 'number') { return res.status(400).json({ message: 'Invalid manager id' }) }

		/** find all parking lots of the given parking manager  */
		let parkingLots = await ParkingManagerParkingLotMapping.findAll({
			where: {
				parkingManagerId,
			}
		});

		/** collect all the ids */
		const idColl = [];
		parkingLots.forEach(pl => idColl.push(pl.getDataValue('id')));

		parkingLots = await ParkingLot.findAll({
			where: {
				id: {
					[Sequelize.Op.in]: idColl
				}
			}
		})

		/** return all the parking lots */
		return res.status(200).json({ parkingLots });
	} catch (err) {
		return next(new Error(err));
	}
});

/** fetch parking lot details of given parking id for the given parking lot manager */
managerRoutes.get('/:parkingManagerId/parkinglots/:parkingLotId', async (req, res, next) => {
	try {

		let { parkingLotId, parkingManagerId } = req.params;

		if (!parkingLotId) { return res.status(400).json({ message: 'Invalid parking lot id' }) }
		if (!parkingManagerId) { return res.status(400).json({ message: 'Invalid manager id' }) }

		parkingLotId = Number(req.params.parkingLotId);
		parkingManagerId = Number(req.params.parkingManagerId);

		/** find all parking lots of the given parking manager  */
		let parkingLot = await ParkingManagerParkingLotMapping.findOne({
			where: {
				parkingManagerId,
				parkingLotId
			}
		});

		parkingLot = await ParkingLot.findAll({
			where: {
				id: parkingLot.getDataValue('id')
			}
		});

		/** return all the parking lots */
		return res.status(200).json({ parkingLot });
	} catch (err) {
		return next(new Error(err));
	}
});