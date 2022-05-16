'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const Admin_Handler_1 = require('../handlers/Admin-Handler');
const express_validator_1 = require('express-validator');
const route = express_1.default.Router();
route.put('/changestatue', Admin_Handler_1.changestatueHandler);
route.put(
  '/upgredUser',
  [
    (0, express_validator_1.body)('id', 'Please Entre Valid id User')
      .exists()
      .isFloat({ min: 1 })
      .isInt(),
    (0, express_validator_1.body)('typeuser', 'Please Entre Valid id Type User')
      .exists()
      .isFloat({ min: 2, max: 3 })
      .withMessage(
        'Occur Error! UnAuthentication Please chnge type between 2 trader and 3 client'
      )
      .isInt()
  ],
  Admin_Handler_1.UpgreadUser
);
route.get('/Users', Admin_Handler_1.GetAllUser);
exports.default = route;
