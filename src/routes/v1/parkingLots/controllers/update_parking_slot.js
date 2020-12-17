import { QueryTypes } from "sequelize";
import { SQLWrite } from "../../../../storage/mysql";

export async function updateParkingSlot(req, res, next) {
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
}