"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUser = exports.UpgreadUser = exports.changestatueHandler = void 0;
const Admin_model_1 = require("../models/Admin-model");
const express_validator_1 = require("express-validator");
const User_model_1 = require("../models/User-model");
function changestatueHandler(req, res, next) {
    const statue = req.user.statue == 1 ? 2 : 1;
    new Admin_model_1.AdminModel().changeStatue(statue, req.user.id)
        .then(reschangestatue => {
        if (reschangestatue === 'UPDATE') {
            res.status(200).json({
                message: 'Successfull Change Update Your statue is ' + (statue == 1 ? 'online' : 'offline')
            });
        }
        else {
            const error = new Error('Occur Error! In change Unexpected Plese return to Develop');
            error.name = '409';
            throw error;
        }
    }).catch(err => {
        return next(err);
    });
}
exports.changestatueHandler = changestatueHandler;
function UpgreadUser(req, res, next) {
    const errorMessage = (0, express_validator_1.validationResult)(req).errors;
    if (errorMessage.length < 1) {
        const id = req.body.id;
        const typeuser = req.body.typeuser;
        if (typeuser > 3 || typeuser < 2) {
            const error = new Error('Occur Error! Please Add Type User Correct');
            error.name = '409';
            return next(error);
        }
        if (req.user.typeuser !== 1) {
            new Admin_model_1.AdminModel().UpgredUser(typeuser, id)
                .then(result => {
                if (result === 'UPDATE') {
                    res.status(200).json({
                        message: 'Successfull Upgrade User'
                    });
                }
                else {
                    const error = new Error('Occur Error! In change Unexpected Plese return to Develop');
                    error.name = '409';
                    throw error;
                }
            }).catch(err => {
                return next(err);
            });
        }
        else {
            res.status(200).json({
                message: 'Cant change Admin'
            });
        }
    }
    else {
        const error = new Error(errorMessage[0].msg);
        error.name = '400';
        return next(error);
    }
}
exports.UpgreadUser = UpgreadUser;
function GetAllUser(req, res, next) {
    new User_model_1.UserModel().getAll()
        .then(users => {
        res.status(200).json({
            message: 'Hello Admin From User',
            users: users
        });
    }).catch(err => {
        return next(err);
    });
}
exports.GetAllUser = GetAllUser;
