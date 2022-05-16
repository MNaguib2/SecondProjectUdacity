'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const Product_handler_1 = require('../handlers/Product-handler');
const express_validator_1 = require('express-validator');
const route = express_1.default.Router();
route.post(
  '/addProduct',
  [
    (0, express_validator_1.body)('name', 'Please Entre Valid Name')
      .isString()
      .isLength({ min: 4 })
      .trim(),
    (0, express_validator_1.body)('price', 'Please Entre Valid price')
      .isFloat({ min: 1 })
      .trim(),
    (0, express_validator_1.body)(
      'description',
      'Please Entre Valid description'
    )
      .isString()
      .isLength({ min: 15 })
      .trim()
  ],
  Product_handler_1.addProduct
);
route.put(
  '/EditProduct/:id',
  [
    (0, express_validator_1.body)('name', 'Please Entre Valid Name')
      .isString()
      .isLength({ min: 4 })
      .trim(),
    (0, express_validator_1.body)('price', 'Please Entre Valid price')
      .isFloat({ min: 1 })
      .trim(),
    (0, express_validator_1.body)(
      'description',
      'Please Entre Valid description'
    )
      .isString()
      .isLength({ min: 15 })
      .trim()
  ],
  Product_handler_1.EditProduct
);
route.delete('/deleteProduct/:id', Product_handler_1.DeleteProduct);
exports.default = route;
