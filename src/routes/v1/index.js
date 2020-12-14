import { Router } from 'express';

import { userRoutes } from './users';
import { vehiclesRoutes } from './vehicles';
import { parkingLotRoutes } from './parkingLots';

export const v1Routes = Router();

v1Routes.use('/users', userRoutes);
v1Routes.use('/vehicles', vehiclesRoutes);
v1Routes.use('/parkinglots', parkingLotRoutes);