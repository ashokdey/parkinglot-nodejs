import { ParkingLot } from "../../../../storage/mysql/models/ParkingLot";
import { ParkingManager } from "../../../../storage/mysql/models/ParkingManager";
import { ParkingManagerParkingLotMapping } from "../../../../storage/mysql/models/ParkingManagerParkingLotMapping";
import { ParkingSlot } from "../../../../storage/mysql/models/ParkingSlot";

export async function createParkingLot(req, res, next) {
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
}