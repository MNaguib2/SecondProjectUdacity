import { NextFunction, Response, Request } from 'express';
import { IGetUserAuthInfoRequest } from '../definitionfile';
import { ProductModel } from '../models/Product-model';
import { UserModel } from '../models/User-model';

export function ShowAllProduct(req: Request, res: Response, next: NextFunction) {
    new ProductModel().getAllDetialsProduct()
        .then(products => {
            if (products) {
                res.status(200).json({
                    message: "Welcome!! " + (req as IGetUserAuthInfoRequest).user.name,
                    Products: products
                })
            } else {
                res.status(200).json({
                    message: "Welcome!! " + (req as IGetUserAuthInfoRequest).user.name,
                    Products: "Not Products Found"
                })
            }
        }).catch(err => {
            return next(err);
        })
}
export function logoutHandler(req: Request, res: Response, next: NextFunction) {
    new UserModel().FindUserByEmail((req as IGetUserAuthInfoRequest).user.email)
        .then(user => {
            if (user) {
                if (user && user.token) {
                    new UserModel().LogoutUser(user.id)
                        .then(Update => {
                            if (Update === 'UPDATE') {
                                res.status(200).json({
                                    message: 'Successfully! Logout'
                                })
                            } else {
                                const error = new Error('Occur Error! During Excute Function Logout error 13');
                                error.name = '406 ';
                                throw error;
                            }
                        }).catch(err => {
                            return next(err);
                        })
                } else {
                    const error = new Error('Occur Error! this user Or Token Invalid  error 14');
                    error.name = '401 ';
                    throw error;
                }
            }
        }).catch(err => {
            return next(err);
        })
}