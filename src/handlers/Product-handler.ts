import { NextFunction, Response, Request } from 'express';
import { GetErrors, IGetUserAuthInfoRequest } from '../definitionfile';
import { ProductModel } from '../models/Product-model';
import { validationResult } from 'express-validator';

export function addProduct(req: Request, res: Response, next: NextFunction) {
    const errorMessage = (validationResult(req) as unknown as GetErrors).errors;
    if (errorMessage.length < 1) {
        const name = req.body.name;
        const price = req.body.price;
        const Id_user = (req as IGetUserAuthInfoRequest).user.id;
        const description = req.body.description;
        //console.log(Id_user);
        if (Id_user !== 3) {
            new ProductModel().ADDProduct({ name: name, description: description, id: 0, id_user: Id_user, price: price })
                .then(result => {
                    if (result === "INSERT") {
                        res.status(201).json({
                            message: 'Successfully! Created Product'
                        })
                    } else {
                        const error = new Error('Occur Error! Unexpected Please Call Developer');
                        error.name = '404';
                        throw error;
                    }
                }).catch(err => {
                    return next(err)
                })
        }
    } else {
        const error = new Error(errorMessage[0].msg);
        error.name = '400';
        return next(error);
    }

}

export function EditProduct(req: Request, res: Response, next: NextFunction) {
    const Id_Product: number = (req.params.id as unknown) as number;
    new ProductModel().getProductByID(Id_Product)
        .then(product => {            
            if (product && 
                (product.id_user === (req as IGetUserAuthInfoRequest).user.id || (req as IGetUserAuthInfoRequest).user.typeuser === 1)) {

                const name = req.body.name;
                const description = req.body.description;
                const price = req.body.price;
                new ProductModel().EditProduct({ name: name, description: description, id: Id_Product, price: price, id_user: 0 })
                    .then(result => {
                        if (result === 'UPDATE') {
                            res.status(200).json({
                                message: 'Successfully! Edit Product'
                            })
                        } else {
                            const error = new Error('Occur Error! During Excute Function Update Product error 8');
                            error.name = '406 ';
                            throw error;
                        }
                    }).catch(err => {
                        return next(err);
                    })
            } else {
                const error = new Error('Occur Error! User UN Authenticated to edite in this product error 5');
                error.name = '401 ';
                throw error;
            }
        }).catch(err => {
            return next(err);
        })
}
export function DeleteProduct(req: Request, res: Response, next: NextFunction) {
    const Id_Product: number = (req.params.id as unknown) as number;
    new ProductModel().getProductByID(Id_Product)
        .then(result => {
            if (result && 
                (result.id_user === (req as IGetUserAuthInfoRequest).user.id || (req as IGetUserAuthInfoRequest).user.typeuser == 1)) {
                new ProductModel().DeleteProductByID(Id_Product)
                    .then(Deleted => {
                        if (Deleted === 'DELETE') {
                            res.status(200).json({
                                message: 'Successfully! Deleted Product'
                            })
                        }else{
                            const error = new Error('Occur Error! During Excute Function Deleted Product error 9');
                            error.name = '406 ';
                            throw error;
                        }
                    }).catch(err => {
                        return next(err);
                    })
            } else {
                const error = new Error('Occur Error! User UN Authenticated to Delete in this product or Product not found error 30');
                error.name = '401 ';
                throw error;
            }
        }).catch(err => {
            return next(err);
        })

}

/*
{
    "name": "test Product",
    "description" : "test any thing to description ",
    "price" : 50
}
*/