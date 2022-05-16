import express from 'express';
import {
  AddItemToCredit,
  RemoveItemToCredit,
  ShowCredit
} from '../handlers/Credite-Handler';
import { param } from 'express-validator';

const route = express.Router();

route.post(
  '/addItemCart/:id',
  param('id', 'Please Entre Valid id Product')
    .exists()
    .isFloat({ min: 1 })
    .isInt(),
  AddItemToCredit
);

route.delete(
  '/deleteProduct/:id',
  param('id', 'Please Entre Valid id Product')
    .exists()
    .isFloat({ min: 1 })
    .isInt(),
  RemoveItemToCredit
);
route.get('/', ShowCredit);
export default route;
