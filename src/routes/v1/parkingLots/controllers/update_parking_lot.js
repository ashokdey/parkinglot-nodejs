import { ParkingLot } from "../../../../storage/mysql/models/ParkingLot";
import { ParkingManagerParkingLotMapping } from "../../../../storage/mysql/models/ParkingManagerParkingLotMapping";

export async function updateParkingLot(req, res, next) {
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
}