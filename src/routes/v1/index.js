import { Router } from 'express';

import { userRoutes } from './users';
import { vehiclesRoutes } from './vehicles';
import { parkingLotRoutes } from './parkingLots';
import { parkingRoutes } from './parking';
import { managerRoutes } from './manager';

export const v1Routes = Router();

v1Routes.use('/users', userRoutes);
v1Routes.use('/managers', managerRoutes);
v1Routes.use('/vehicles', vehiclesRoutes);
v1Routes.use('/parkinglots', parkingLotRoutes);
v1Routes.use('/parking', parkingRoutes);