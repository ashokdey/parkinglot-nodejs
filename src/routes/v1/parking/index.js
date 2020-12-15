import { Router } from 'express';
import Sequelize from 'sequelize';

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

		/** check if parking can be done */
		const parkingLotSlotSize = parkingLot.getDataValue('slotSize');
		const parkingLotBookedSlots = parkingLot.getDataValue('bookedSlots');

		if (parkingLotBookedSlots === parkingLotSlotSize) {
			return res.status(422).json({ message: 'Parking lot is full' });
		}

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
});

/** receiave a token and un-park the vehicle */
parkingRoutes.post('/unpark', async (req, res, next) => {
	try {
		const { token } = req.body;

		if (!token) { return res.status(400).json({ message: 'token is required' }) }

		/** Find parking using the token */
		const parking = await CurrentParking.findOne({
			where: {
				token
			}
		});

		/** handle bad cases */
		if (!parking) { return res.status(404).json({ message: 'Token not found ' }) }

		const parkingLotId = parking.getDataValue('parkingLotId');
		const parkingSlotId = parking.getDataValue('parkingSlotId');
		const parkingTime = parking.getDataValue('parkingTime');

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
		/** calculate fees */
		console.log({ parkingTime });

		/** return the fees */
		return res.status(201).json({});
	} catch (err) {
		return next(new Error(err));
	}
});