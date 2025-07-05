import express from 'express';
import { allResidencies, createResidency, getResidency } from '../controllers/residencycntrl.js';
import jwtCheck from '../config/auth0Config.js';

const route =new express.Router();

route.post('/create',jwtCheck,createResidency);
route.get('/all',allResidencies);
route.get('/:id',getResidency)
export {route as residencyRoute};