import { Router } from 'express';
import { createParking } from './controllers/create_parking';
import { unpark } from './controllers/unpark';


export const parkingRoutes = Router();

/** create a parking and return token */
parkingRoutes.post('/', createParking);

/** receiave a token and un-park the vehicle */
parkingRoutes.post('/unpark', unpark);