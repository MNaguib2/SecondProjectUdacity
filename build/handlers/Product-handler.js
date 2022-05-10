"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = exports.EditProduct = exports.addProduct = void 0;
const Product_model_1 = require("../models/Product-model");
const express_validator_1 = require("express-validator");
function addProduct(req, res, next) {
    const errorMessage = (0, express_validator_1.validationResult)(req).errors;
    if (errorMessage.length < 1) {
        const name = req.body.name;
        const price = req.body.price;
        const Id_user = req.user.id;
        const description = req.body.description;
        //console.log(Id_user);
        if (Id_user !== 3) {
            new Product_model_1.ProductModel().ADDProduct({ name: name, description: description, id: 0, Id_user: Id_user, price: price })
                .then(result => {
                if (result === "INSERT") {
                    res.status(201).json({
                        message: 'Successfully! Created Product'
                    });
                }
                else {
                    const error = new Error('Occur Error! Unexpected Please Call Developer');
                    error.name = '404';
                    throw error;
                }
            }).catch(err => {
                return next(err);
            });
        }
    }
    else {
        const error = new Error(errorMessage[0].msg);
        error.name = '400';
        return next(error);
    }
}
exports.addProduct = addProduct;
function EditProduct(req, res, next) {
    const Id_Product = req.params.id;
    new Product_model_1.ProductModel().getProductByID(Id_Product)
        .then(product => {
        if (product && (product.Id_user === req.user.id || req.user.typeuser == 1)) {
            const name = req.body.name;
            const description = req.body.description;
            const price = req.body.price;
            new Product_model_1.ProductModel().EditProduct({ name: name, description: description, id: Id_Product, price: price, Id_user: 0 })
                .then(result => {
                if (result === 'UPDATE') {
                    res.status(200).json({
                        message: 'Successfully! Edit Product'
                    });
                }
                else {
                    const error = new Error('Occur Error! During Excute Function Update Product error 8');
                    error.name = '406 ';
                    throw error;
                }
            }).catch(err => {
                return next(err);
            });
        }
        else {
            const error = new Error('Occur Error! User UN Authenticated to edite in this product error 5');
            error.name = '401 ';
            throw error;
        }
    }).catch(err => {
        return next(err);
    });
}
exports.EditProduct = EditProduct;
function DeleteProduct(req, res, next) {
    const Id_Product = req.params.id;
    new Product_model_1.ProductModel().getProductByID(Id_Product)
        .then(result => {
        if (result && (result.Id_user === req.user.id || req.user.typeuser == 1)) {
            new Product_model_1.ProductModel().DeleteProductByID(Id_Product)
                .then(Deleted => {
                if (Deleted === 'DELETE') {
                    res.status(200).json({
                        message: 'Successfully! Deleted Product'
                    });
                }
                else {
                    const error = new Error('Occur Error! During Excute Function Deleted Product error 9');
                    error.name = '406 ';
                    throw error;
                }
            }).catch(err => {
                return next(err);
            });
        }
        else {
            const error = new Error('Occur Error! User UN Authenticated to edite in this product error 5');
            error.name = '401 ';
            throw error;
        }
    }).catch(err => {
        return next(err);
    });
}
exports.DeleteProduct = DeleteProduct;
/*
{
    "name": "test Product",
    "description" : "test any thing to description ",
    "price" : 50
}
*/ 
