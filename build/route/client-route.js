'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const Client_handler_1 = require('../handlers/Client-handler');
const route = express_1.default.Router();
route.get('/', Client_handler_1.ShowAllProduct);
route.put('/logout', Client_handler_1.logoutHandler);
exports.default = route;
