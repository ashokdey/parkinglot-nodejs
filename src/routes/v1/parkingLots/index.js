import { Router } from 'express';
import { ParkingLot } from '../../../storage/mysql/models/ParkingLot';
import { ParkingSlot } from '../../../storage/mysql/models/ParkingSlot';
import { ParkingManagerParkingLotMapping } from '../../../storage/mysql/models/ParkingManagerParkingLotMapping';


export const parkingLotRoutes = Router();

parkingLotRoutes.post('/', async (req, res, next) => {
	/** create the parking lots */
	try {
		const { parkingManagerId, slotSize } = req.body;
		const parkingLot = await ParkingLot.create({
			slotSize
		});
		const parkingLotId = parkingLot.getDataValue('id');

		// create parking slots
		const arr = [];
		for (let i = 0; i < slotSize; i += 1) {
			arr.push({ parkingLotId, slotNumber: `P0${i}` });
		}
		await ParkingSlot.bulkCreate(arr);

		/** Assign the parking lot to the manager */
		await ParkingManagerParkingLotMapping.create({
			parkingManagerId,
			parkingLotId,
		});

		return res.status(201).json({ parkingLot });
	} catch (err) {
		return next(new Error(err));
	}
});

parkingLotRoutes.patch('/:parkingLotId', async (req, res, next) => {
	/** create the parking lots */
	try {
		const { parkingLotId } = req.params;
		const { mode, managerId } = req.body;

		/** Find the parking lot if the given manager */
		let parkingLot = await ParkingManagerParkingLotMapping.findOne({
			where: {
				parkingLotId,
				parkingManagerId: managerId
			}
		});

		if (!parkingLot) { return res.status(404).json({ message: 'Parking lot not found ' }) }

		await ParkingLot.update(
			{ mode, },
			{ where: { id: parkingLotId } }
		);

		/** fetch the details and return */
		parkingLot = await ParkingLot.findOne({ id: parkingLotId });
		return res.status(200).json({ parkingLot });
	} catch (err) {
		return next(new Error(err));
	}
});

parkingLotRoutes.get('/', async (req, res, next) => {
	/** fetch all the parking lots */
	try {
		const parkingLots = await ParkingLot.findAll();
		return res.status(200).json({ parkingLots });
	} catch (err) {
		return next(new Error(err));
	}
});

parkingLotRoutes.get('/:managerId/', async (req, res, next) => {
	/** fetch all the details of the parking lot of the given manager id */
	try {
		const { managerId } = req.params;

		/** find all the paprking lot of the manager */
		const parkingLotIds = await ParkingManagerParkingLotMapping.findAll({
			where: {
				parkingManagerId: managerId
			}
		});

		const parkingLot = await ParkingLot.findOne({
			where: {
				id: parkingLotIds,
			}
		});

		return res.status(200).json({ parkingLot });
	} catch (err) {
		return next(new Error(err));
	}
});
