import express from 'express';
import { changestatueHandler, UpgreadUser } from '../handlers/Admin-Handler';
const route = express.Router();

route.put('/changestatue', changestatueHandler);
route.put('/upgredUser', UpgreadUser);


export default route;