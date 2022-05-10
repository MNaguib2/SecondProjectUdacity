"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.ShowAllProduct = void 0;
const Product_model_1 = require("../models/Product-model");
const User_model_1 = require("../models/User-model");
function ShowAllProduct(req, res, next) {
    new Product_model_1.ProductModel().getAllDetialsProduct()
        .then(products => {
        if (products) {
            res.status(200).json({
                message: "Welcome!! " + req.user.name,
                Products: products
            });
        }
        else {
            res.status(200).json({
                message: "Welcome!! " + req.user.name,
                Products: "Not Products Found"
            });
        }
    }).catch(err => {
        return next(err);
    });
}
exports.ShowAllProduct = ShowAllProduct;
function logoutHandler(req, res, next) {
    new User_model_1.UserModel().FindUserByEmail(req.user.email)
        .then(user => {
        if (user) {
            if (user && user.token) {
                new User_model_1.UserModel().LogoutUser(user.id)
                    .then(Update => {
                    if (Update === 'UPDATE') {
                        res.status(200).json({
                            message: 'Successfully! Logout'
                        });
                    }
                    else {
                        const error = new Error('Occur Error! During Excute Function Logout error 13');
                        error.name = '406 ';
                        throw error;
                    }
                }).catch(err => {
                    return next(err);
                });
            }
            else {
                const error = new Error('Occur Error! this user Or Token Invalid  error 14');
                error.name = '401 ';
                throw error;
            }
        }
    }).catch(err => {
        return next(err);
    });
}
exports.logoutHandler = logoutHandler;
