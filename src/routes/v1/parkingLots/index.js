import { Router } from 'express';
import { QueryTypes } from 'sequelize';
import { ParkingLot } from '../../../storage/mysql/models/ParkingLot';
import { ParkingSlot } from '../../../storage/mysql/models/ParkingSlot';
import { ParkingManager } from '../../../storage/mysql/models/ParkingManager';
import { ParkingManagerParkingLotMapping } from '../../../storage/mysql/models/ParkingManagerParkingLotMapping';
import { SQLWrite } from '../../../storage/mysql';

/** create a parking lot router */
export const parkingLotRoutes = Router();

/** create a parking lot */
parkingLotRoutes.post('/', async (req, res, next) => {
	/** create the parking lots */
	try {
		const { managerId: parkingManagerId, slotSize } = req.body;
		if (typeof parkingManagerId !== 'number') { return res.status(400).json({ message: 'invalid manager id' }) }
		if (typeof slotSize !== 'number') { return res.status(400).json({ message: 'invalid slot size' }) }

		/** validate the manager exists */
		const manager = await ParkingManager.findOne({
			where: {
				id: parkingManagerId,
			}
		});

		if (!manager) { return res.status(404).json({ message: 'parking manager not found' }) }

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

/** mark the slot as active/inactive */
parkingLotRoutes.patch('/:parkingLotId/slots/:parkingSlotId', async (req, res, next) => {
	/** fetch all the parking slots details of a parking lot */
	try {
		const { parkingLotId, parkingSlotId, isActive } = req.params;
		/** fetch all the slots of the parking lot */

		const query = 'UPDATE parking_slots SET is_active = ? WHERE id = ? AND parking_lot_id = ?';

		await SQLWrite.query(query, {
			type: QueryTypes.UPDATE,
			replacements: [
				Number(isActive),
				parkingLotId,
				parkingSlotId
			]
		});
		return res.status(200).json({ message: 'success' });
	} catch (err) {
		return next(new Error(err));
	}
});

/** update a parking lot */
parkingLotRoutes.patch('/:parkingLotId', async (req, res, next) => {
	/** create the parking lots */
	try {
		const parkingLotId = Number(req.params.parkingLotId);
		const { mode, managerId } = req.body;

		if (typeof parkingLotId !== 'number') { return res.status(400).json({ message: 'invalid parking lot id' }) }
		if (typeof managerId !== 'number') { return res.status(400).json({ message: 'invalid manager id' }) }

		/** Find the parking lot with the given manager */
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
		parkingLot = await ParkingLot.findOne({
			where: {
				id: parkingLotId
			}
		});
		return res.status(200).json({ parkingLot });
	} catch (err) {
		return next(new Error(err));
	}
});

/** fetch all the parking lots */
parkingLotRoutes.get('/', async (req, res, next) => {
	/** fetch all the parking lots */
	try {
		const parkingLots = await ParkingLot.findAll();
		return res.status(200).json({ parkingLots });
	} catch (err) {
		return next(new Error(err));
	}
});

/** fetch the slots of parking lot */
parkingLotRoutes.get('/:parkingLotId/slots', async (req, res, next) => {
	/** fetch all the parking slots details of a parking lot */
	try {
		const { parkingLotId } = req.params;
		/** fetch all the slots of the parking lot */
		const parkingSlots = await ParkingSlot.findAll({
			where: {
				parkingLotId,
			}
		});
		return res.status(200).json({ parkingSlots });
	} catch (err) {
		return next(new Error(err));
	}
});