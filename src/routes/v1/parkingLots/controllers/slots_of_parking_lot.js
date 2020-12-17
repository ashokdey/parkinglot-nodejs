import { ParkingSlot } from "../../../../storage/mysql/models/ParkingSlot";

export async function slotsOfParkingLot(req, res, next) {
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
}