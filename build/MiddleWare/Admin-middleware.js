"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleWare = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const User_model_1 = require("../models/User-model");
dotenv.config();
function AdminMiddleWare(req, res, next) {
    const token = req.get('Token');
    jwt.verify(token, process.env.PassWordDev, (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: 'Occur Error! Please Back To Developer number 1'
            });
            return console.log(err);
        }
        const email = decoded.email;
        const token = decoded.Token;
        const numberexpiration = (decoded.exp);
        if (Date.now() < numberexpiration) {
            new User_model_1.UserModel().FindUserByEmail(email)
                .then((resultUser) => {
                if (resultUser && resultUser.typeuser === 1 && resultUser.token === token) {
                    req.user = resultUser;
                    return next();
                }
                else {
                    const error = new Error('Occur Error! UnAuthentication Please Try Change URL number 2');
                    error.name = '401';
                    throw error;
                }
            }).catch(err => {
                return next(err);
            });
        }
        else {
            const error = new Error('Occur Error! UnAuthentication Session is Terminate Please Try Login number 3');
            error.name = '401';
            return next(error);
        }
    });
}
exports.AdminMiddleWare = AdminMiddleWare;
