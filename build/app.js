"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Authentication_route_1 = __importDefault(require("./route/Authentication-route"));
const Admin_Route_1 = __importDefault(require("./route/Admin-Route"));
const Product_route_1 = __importDefault(require("./route/Product-route"));
const Admin_middleware_1 = require("./MiddleWare/Admin-middleware");
const body_parser_1 = __importDefault(require("body-parser"));
const Product_MiddleWare_1 = require("./MiddleWare/Product-MiddleWare");
const Client_MiddleWare_1 = require("./MiddleWare/Client-MiddleWare");
const Product_model_1 = require("./models/Product-model");
const client_route_1 = __importDefault(require("./route/client-route"));
const Credit_Route_1 = __importDefault(require("./route/Credit-Route"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use('/Auth', Authentication_route_1.default);
app.use('/Admin', Admin_middleware_1.AdminMiddleWare, Admin_Route_1.default);
app.use('/Product', Product_MiddleWare_1.productmiddleware, Product_route_1.default);
app.use('/Client', Client_MiddleWare_1.ClientMiddleWare, client_route_1.default);
app.use('/Cart', Client_MiddleWare_1.CridetMiddleWare, Credit_Route_1.default);
app.use('**', (req, res) => {
    new Product_model_1.ProductModel().getAllProduct()
        .then(Products => {
        if (Products) {
            res.status(404).json({
                message: 'Not Page Found Incorrect URL',
                Products: Products
            });
        }
        else {
            res.status(404).json({
                message: 'Not Page Found Incorrect URL',
                Products: 'Not Found Any Product'
            });
        }
    }).catch(err => {
        console.log('This is main Error this rarely happen' + err);
    });
});
app.use((error, req, res, next) => {
    //console.log('test From app');
    try {
        const StatusCode = Number(error.toString().split(':')[0].trim());
        //console.log(StatusCode);
        if (isNaN(StatusCode))
            throw new Error(error.toString());
        const message = error.toString().split(':')[1].trim();
        return res.status(StatusCode).json({
            message: message,
            StatusCode: StatusCode
        });
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({
            message: "Occur Error! Unexpected Please Call Developer",
        });
    }
    next();
});
app.listen({ port: 3000 }, () => {
    console.log('server Running Ok !!');
});
exports.default = app;
