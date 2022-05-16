import express from 'express';
import {
  changestatueHandler,
  UpgreadUser,
  GetAllUser
} from '../handlers/Admin-Handler';
import { body } from 'express-validator';
const route = express.Router();

route.put('/changestatue', changestatueHandler);
route.put(
  '/upgredUser',
  [
    body('id', 'Please Entre Valid id User')
      .exists()
      .isFloat({ min: 1 })
      .isInt(),
    body('typeuser', 'Please Entre Valid id Type User')
      .exists()
      .isFloat({ min: 2, max: 3 })
      .withMessage(
        'Occur Error! UnAuthentication Please chnge type between 2 trader and 3 client'
      )
      .isInt()
  ],
  UpgreadUser
);

route.get('/Users', GetAllUser);
export default route;
