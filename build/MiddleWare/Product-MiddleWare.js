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
exports.productmiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const User_model_1 = require("../models/User-model");
dotenv.config();
function productmiddleware(req, res, next) {
    const token = req.get('Token');
    jwt.verify(token, process.env.PassWordDev, (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: 'Occur Error! In Token Please Back To Developer '
            });
            return console.log(err);
        }
        const decodedPayload = decoded;
        if (Date.now() < decodedPayload.exp) {
            new User_model_1.UserModel().FindUserByEmail(decodedPayload.email)
                .then(result => {
                if (result && result.typeuser !== 3 && result.token === decodedPayload.Token) {
                    new User_model_1.UserModel().FindBytypeuser(1)
                        .then(resultStatue => {
                        if (resultStatue && resultStatue.statue == 1) {
                            req.user = result;
                            return next();
                        }
                        else {
                            const error = new Error('Occur Error! Store offline Now Pleasw Back to stakeholders');
                            error.name = '407';
                            throw error;
                        }
                    }).catch(err => {
                        return next(err);
                    });
                }
                else {
                    const error = new Error('Occur Error! UnAuthentication to access this url please try again');
                    error.name = '401';
                    throw error;
                }
            }).catch(err => {
                return next(err);
            });
        }
        else {
            const error = new Error('Occur Error! Session Terminated Please Try Login');
            error.name = '408';
            return next(error);
        }
    });
}
exports.productmiddleware = productmiddleware;
