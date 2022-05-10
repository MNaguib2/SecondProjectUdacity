"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authentication_handler_1 = require("../handlers/Authentication-handler");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post('/signUp', [(0, express_validator_1.body)('email', 'Please Entre Valid email').isEmail().isLowercase().trim(),
    (0, express_validator_1.body)('password', 'Please Entre Valid password Minimum 6 character').isAlphanumeric().isLength({ min: 6 }).trim()], Authentication_handler_1.signuphandler);
router.put('/signIn', [(0, express_validator_1.body)('email', 'Please Entre Valid email').isEmail().isLowercase().trim(),
    (0, express_validator_1.body)('password', 'Please Entre Valid password Minimum 6 character').isAlphanumeric().isLength({ min: 6 }).trim()], Authentication_handler_1.SignIn);
exports.default = router;
