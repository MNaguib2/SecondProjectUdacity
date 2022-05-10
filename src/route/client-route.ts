import express from 'express';
import { logoutHandler, ShowAllProduct } from '../handlers/Client-handler';
const route = express.Router();

route.get('/', ShowAllProduct);
route.put('/logout', logoutHandler);

export default route;