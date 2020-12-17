import { Router } from 'express';
import { createParkingLot } from './controllers/create_parking_lot';
import { slotsOfParkingLot } from './controllers/slots_of_parking_lot';
import { listOfParkingLots } from './controllers/parking_lot_list';
import { updateParkingLot } from './controllers/update_parking_lot';
import { updateParkingSlot } from './controllers/update_parking_slot';

/** create a parking lot router */
export const parkingLotRoutes = Router();

/** create a parking lot */
parkingLotRoutes.post('/', createParkingLot);

/** mark the slot as active/inactive */
parkingLotRoutes.patch('/:parkingLotId/slots/:parkingSlotId', updateParkingSlot);

/** update a parking lot */
parkingLotRoutes.patch('/:parkingLotId', updateParkingLot);

/** fetch all the parking lots */
parkingLotRoutes.get('/', listOfParkingLots);

/** fetch the slots of parking lot */
parkingLotRoutes.get('/:parkingLotId/slots', slotsOfParkingLot);