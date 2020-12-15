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
		const { mode } = req.body;

		await ParkingLot.update(
			{ mode, },
			{ where: { id: parkingLotId } }
		);

		const parkingLot = await ParkingLot.findOne({ id: parkingLotId });
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

parkingLotRoutes.get('/:parkingLotId', async (req, res, next) => {
	/** fetch all the details of the parking lot using given id */
	try {
		const { parkingLotId } = req.params;

		const parkingLot = await ParkingLot.findOne({
			where: {
				id: parkingLotId,
			}
		});
		return res.status(200).json({ parkingLot });
	} catch (err) {
		return next(new Error(err));
	}
});
