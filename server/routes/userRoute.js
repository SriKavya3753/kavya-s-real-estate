import express from 'express';
import { Prisma } from '@prisma/client';
import { allBookings, allfavourites, bookedVisit,cancelBooking,createUser, toFav } from '../controllers/userCntrl.js';
import jwtCheck from '../config/auth0Config.js';

const route =new express.Router();

route.post('/register',jwtCheck,createUser);
route.post('/bookVisits/:id',jwtCheck,bookedVisit);
route.post('/allBookings',allBookings);
route.post('/cancelBooking/:id',jwtCheck,cancelBooking);
route.post('/toFav/:id',jwtCheck,toFav);
route.post('/allFav',jwtCheck,allfavourites);
export {route as userRoute}