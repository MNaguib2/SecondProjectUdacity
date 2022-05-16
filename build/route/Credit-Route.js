'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const Credite_Handler_1 = require('../handlers/Credite-Handler');
const express_validator_1 = require('express-validator');
const route = express_1.default.Router();
route.post(
  '/addItemCart/:id',
  (0, express_validator_1.param)('id', 'Please Entre Valid id Product')
    .exists()
    .isFloat({ min: 1 })
    .isInt(),
  Credite_Handler_1.AddItemToCredit
);
route.delete(
  '/deleteProduct/:id',
  (0, express_validator_1.param)('id', 'Please Entre Valid id Product')
    .exists()
    .isFloat({ min: 1 })
    .isInt(),
  Credite_Handler_1.RemoveItemToCredit
);
route.get('/', Credite_Handler_1.ShowCredit);
exports.default = route;
