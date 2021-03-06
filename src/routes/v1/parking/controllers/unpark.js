import { QueryTypes } from "sequelize";
import { CURRENT_PARKING_STATUS, PARKING_FEES, PARKING_SLOT_STATUS } from "../../../../constants";
import { SQLWrite } from "../../../../storage/mysql";
import { CurrentParking } from "../../../../storage/mysql/models/CurrentParking";
import { ParkingLot } from "../../../../storage/mysql/models/ParkingLot";
import Sequelize from 'sequelize';
import { ParkingSlot } from "../../../../storage/mysql/models/ParkingSlot";

export async function unpark(req, res, next) {
	try {
		const { token } = req.body;

		if (!token) { return res.status(400).json({ message: 'token is required' }) }

		/** Find parking using the token */
		const parking = await CurrentParking.findOne({
			where: {
				token,
				status: CURRENT_PARKING_STATUS.PARKED
			}
		});

		/** handle bad cases */
		if (!parking) { return res.status(404).json({ message: 'Token not found ' }) }

		const parkingId = parking.getDataValue('id');
		const parkingLotId = parking.getDataValue('parkingLotId');
		const parkingSlotId = parking.getDataValue('parkingSlotId');

		/** Calculate fees */
		const query = `SELECT TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP, parking_time))/3600 AS hours FROM current_parkings WHERE id = ?`;

		const hours = await SQLWrite.query(query, {
			type: QueryTypes.SELECT,
			replacements: [parkingId]
		});

		const fees = Math.ceil(hours[0].hours) * PARKING_FEES;

		/** return the fees */
		res.status(201).json({ fees });

		/** mark the parking as unpark and add fees */
		await CurrentParking.update({
			fees,
			status: CURRENT_PARKING_STATUS.UNPARKED
		}, {
			where: {
				id: parkingId
			}
		})

		/** decrease the count of parking lot */
		const parkingLot = await ParkingLot.findOne({ where: { id: parkingLotId } });

		/** find the slot and decrease the count only if it's greater than 0 */
		if (parkingLot) {
			const bookedSlots = parkingLot.getDataValue('bookedSlots');
			if (bookedSlots > 0) {
				await ParkingLot.update({
					bookedSlots: Sequelize.literal('booked_slots - 1')
				}, {
					where: {
						id: parkingLotId
					}
				});
			}
		}

		/** clean the parking slot and mark as FREE */
		await ParkingSlot.update({
			slotStatus: PARKING_SLOT_STATUS.FREE,
			vehicleId: null
		}, {
			where: {
				id: parkingSlotId,
			}
		});
	} catch (err) {
		return next(new Error(err));
	}
}