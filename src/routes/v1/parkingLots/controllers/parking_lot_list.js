import { ParkingLot } from "../../../../storage/mysql/models/ParkingLot";

export async function listOfParkingLots(req, res, next) {
	/** fetch all the parking lots */
	try {
		const parkingLots = await ParkingLot.findAll();
		return res.status(200).json({ parkingLots });
	} catch (err) {
		return next(new Error(err));
	}
}