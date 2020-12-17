import Sequelize from "sequelize";
import { PARKING_LOT_STATUS, PARKING_SLOT_STATUS } from "../../../../constants";
import { CurrentParking } from "../../../../storage/mysql/models/CurrentParking";
import { ParkingLot } from "../../../../storage/mysql/models/ParkingLot";
import { ParkingSlot } from "../../../../storage/mysql/models/ParkingSlot";
import { randomString } from "../../../../utils";

export async function createParking(req, res, next) {
	try {
		const { parkingLotId, vehicleId } = req.body;

		if (typeof parkingLotId !== 'number') { return res.status(400).json({ message: 'invalid parking lot id' }) }
		if (typeof vehicleId !== 'number') { return res.status(400).json({ message: 'invalid vehicle id' }) }

		const parkingToken = randomString();
		/** find the parking lot using Active status */
		const parkingLot = await ParkingLot.findOne({
			where: { id: parkingLotId, mode: PARKING_LOT_STATUS.ACTIVE },
		});

		if (!parkingLot) { return res.status(400).json({ message: 'parking lot is not in operation' }) }
		/** check if parking can be done */
		const parkingLotSlotSize = parkingLot.getDataValue('slotSize');
		const parkingLotBookedSlots = parkingLot.getDataValue('bookedSlots');

		if (parkingLotBookedSlots === parkingLotSlotSize) {
			return res.status(422).json({ message: 'Parking lot is full' });
		}

		const parkingSlot = await ParkingSlot.findOne({
			where: {
				parkingLotId,
				isActive: 1
			}, order: ['id', 'asc'], limit: 1
		});

		if (!parkingSlot) { return res.status(422).json({ message: 'Slots are not available' }) }
		const parkingSlotId = parkingSlot.getDataValue('id');

		/** Park the vehicle in the slot */
		const newParking = await ParkingSlot.findOne({ where: { id: parkingSlotId, isActive: 1 } });
		await newParking.update({
			slotStatus: PARKING_SLOT_STATUS.BOOKED,
			vehicleId,
			parkingLotId
		});

		/** create an entry in current parkings */
		const currentParkingDetails = {
			token: parkingToken,
			vehicleId,
			parkingLotId,
			parkingSlotId,
		}
		await CurrentParking.create(currentParkingDetails);

		/** update the booking count of parking lot */
		ParkingLot.update({
			bookedSlots: Sequelize.literal('booked_slots + 1')
		}, {
			where: {
				id: parkingLotId
			}
		});
		/** return a token */
		return res.status(201).json({ parkingToken });
	} catch (err) {
		return next(new Error(err));
	}
}