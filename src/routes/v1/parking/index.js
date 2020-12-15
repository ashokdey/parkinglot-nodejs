import { Router } from 'express';
import { ParkingSlot } from '../../../storage/mysql/models/ParkingSlot';
import { ParkingLot } from '../../../storage/mysql/models/ParkingLot';
import { CurrentParking } from '../../../storage/mysql/models/CurrentParking';
import { randomString } from '../../../utils';
import { PARKING_LOT_STATUS, PARKING_SLOT_STATUS } from '../../../constants';


export const parkingRoutes = Router();

/** create a parking and return token */
parkingRoutes.post('/', async (req, res, next) => {
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

		/** Find nearest parking slot using the parking lot id*/
		const parkingSlot = await ParkingSlot.findOne({
			where: {
				parkingLotId,
				slotStatus: PARKING_SLOT_STATUS.FREE
			},
			order: [
				['id', 'asc'],
			],
			limit: 1
		});

		if (!parkingSlot) { return res.status(422).json({ message: 'Slots are not available' }) }
		const parkingSlotId = parkingSlot.getDataValue('id');

		/** Park the vehicle in the slot */
		const newParking = await ParkingSlot.findOne({ where: { id: parkingSlotId } });
		await newParking.update({
			slotStatus: PARKING_SLOT_STATUS.BOOKED,
			vehicleId,
			parkingLotId
		});

		/** create an entry in current parkings */
		const currentParkingDetails = {
			tokenId: parkingToken,
			vehicleId,
			parkingLotId,
			parkingSlotId,
		}
		await CurrentParking.create(currentParkingDetails);

		/** return a token */
		return res.status(201).json({ parkingToken });
	} catch (err) {
		return next(new Error(err));
	}
});

/** receiave a token and un-park the vehicle */
parkingRoutes.post('/unpark/parkingLotId', async (req, res, next) => {
	/** create a new parking */

	/**
	 * get token
	 * find the details from current parking using token
	 * find the nearest parking slot using Parking Id
	 * create a parking using the parking slot
	 * return the FEES, slotDetails and parking lot details
	 */
	try {
		const { token } = req.body;

		/** Find parking using the token */

		/** handle bad cases */

		/** clean the parking slot and mark as FREE */

		/** decrease the count of parking slot used */

		/** calculate fees */

		/** return the fees */

		return res.status(201).json({});
	} catch (err) {
		return next(new Error(err));
	}
});