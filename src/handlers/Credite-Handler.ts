import { NextFunction, Response, Request } from 'express';
import { GetErrors, IGetUserAuthInfoRequest } from '../definitionfile';
import { ProductModel } from '../models/Product-model';
import { validationResult } from 'express-validator';
import { CrediteModel } from '../models/Credit-model';

export function AddItemToCredit(req: Request, res: Response, next: NextFunction) {
    const errorMessage = (validationResult(req) as unknown as GetErrors).errors;
    if (errorMessage.length < 1) {
        const idItem: number = (req.params.id as unknown) as number;
        const idUser: number = (req as IGetUserAuthInfoRequest).user.id;
        const quantity = 1;
        new CrediteModel().getAllCrediteToUser(idUser)
            .then(result => {
                if (result) {
                    const idcared: number = result.id;
                    new CrediteModel().getCreditItem(idItem, idcared)
                        .then(items => {
                            if (items) {
                                const price = items.totalprice / items.quantity;
                                const TotalQuantity = items.quantity + quantity;
                                const totalprice = TotalQuantity * price;
                                new CrediteModel().AddItemAgain(TotalQuantity, totalprice, items.id)
                                    .then(sucessfuladd => {
                                        if (sucessfuladd) {
                                            new CrediteModel().CalculateTotalPrice(idcared);
                                            res.status(200).json({
                                                message: "Successfully Add Item"
                                            })
                                        } else {
                                            const error = new Error(`Occur Error! during add  Item to Credite 22`);
                                            error.name = '406 ';
                                            throw error;
                                        }
                                    }).catch(err => {
                                        return next(err)
                                    })
                            } else {
                                new ProductModel().getProductByID(idItem)
                                    .then(product => {
                                        if (product) {
                                            new CrediteModel().AddItemCredit({
                                                id: 0, id_card: idcared, id_product: idItem,
                                                quantity: quantity, totalprice: product.price
                                            })
                                                .then(addedItem => {
                                                    if (addedItem === "INSERT") {
                                                        new CrediteModel().CalculateTotalPrice(idcared);
                                                        return res.status(200).json({
                                                            message: "Add New Item Done!"
                                                        })
                                                    } else {
                                                        const error = new Error(`Occur Error! during add new Item to Credite 25`);
                                                        error.name = '406 ';
                                                        throw error;
                                                    }
                                                }).catch(err => {
                                                    return next(err)
                                                })
                                        } else {
                                            const error = new Error(`Occur Error! Not Found Product With ID Sended Number ${idItem} error number 24`);
                                            error.name = '401 ';
                                            throw error;
                                        }

                                    }).catch(err => {
                                        return next(err)
                                    })
                            }
                        }).catch(err => {
                            return next(err)
                        })
                } else {
                    new ProductModel().getProductByID(idItem)
                        .then(Product => {
                            if (Product) {
                                new CrediteModel().CreateNewCredit({ id: 0, id_user: idUser, totalprice: Product.price })
                                    .then(CreateNewID => {
                                        if (CreateNewID > 0) {
                                            new CrediteModel()
                                                .AddItemCredit({
                                                    id: 0, id_card: CreateNewID,
                                                    id_product: idItem, totalprice: Product.price, quantity: quantity
                                                })
                                                .then(insertItemCredit => {
                                                    if (insertItemCredit === "INSERT") {
                                                        res.status(200).json({
                                                            message: "Create new Credit Is Ok! and Add New Item Done!"
                                                        })
                                                    } else {
                                                        const error = new Error(`Occur Error! during add new Item to Credite 20`);
                                                        error.name = '406 ';
                                                        throw error;
                                                    }
                                                }).catch(err => {
                                                    return next(err)
                                                })
                                        } else {
                                            const error = new Error('Occur Error! Unexpected when System try Created New Credit TO you please Back TO Developer Error 19');
                                            error.name = '406';
                                            throw error;
                                        }
                                    }).catch(err => {
                                        return next(err)
                                    })

                            } else {
                                const error = new Error(`Occur Error! Not Found Product With ID Sended Number ${idItem} error number 17`);
                                error.name = '401 ';
                                throw error;
                            }
                        }).catch(err => {
                            return next(err)
                        })
                }

            }).catch(err => {
                return next(err)
            })
    } else {
        const error = new Error(errorMessage[0].msg);
        error.name = '400';
        return next(error);
    }
}

export function ShowCredit(req: Request, res: Response, next: NextFunction) {
    const idUser: number = (req as IGetUserAuthInfoRequest).user.id;
    new CrediteModel().getAllCrediteToUser(idUser)
        .then(credits => {
            if (credits) {
                new CrediteModel().getALLCreditItem(credits.id)
                    .then(items => {
                        if (items.length > 0) {
                            res.status(200).json({
                                message: "Welcome In Cards",
                                Items : items,
                                Total_Price: credits.totalprice
                            })
                        } else {
                            res.status(404).json({
                                message: "No Items Found In this card"
                            })
                        }
                    }).catch(err => {
                        return next(err)
                    })
            } else {
                res.status(404).json({
                    Message: "No Credit Found!"
                })
            }
        }).catch(err => {
            return next(err)
        })
}

export function RemoveItemToCredit(req: Request, res: Response, next: NextFunction) {
    const errorMessage = (validationResult(req) as unknown as GetErrors).errors;
    if (errorMessage.length < 1) {
        const idItem: number = (req.params.id as unknown) as number;
        const idUser: number = (req as IGetUserAuthInfoRequest).user.id;
        new CrediteModel().getAllCrediteToUser(idUser)
            .then(Cards => {
                if (Cards) {
                    new CrediteModel().DeleteItem(Cards.id, idItem)
                        .then(Deleted => {
                            if (Deleted > 0) {
                                new CrediteModel().CalculateTotalPrice(Cards.id);
                                return res.status(200).json({
                                    Message: "Successfully! Deleted"
                                })
                            } else {
                                const error = new Error(`Occur Error! when confirm function Deleted even 27`);
                                error.name = '406 ';
                                throw error;
                            }
                        }).catch(err => {
                            return next(err)
                        })
                } else {
                    const error = new Error(`Occur Error!Not found Card to User 25`);
                    error.name = '401 ';
                    throw error;
                }
            }).catch(err => {
                return next(err)
            })
    } else {
        const error = new Error(errorMessage[0].msg);
        error.name = '400';
        return next(error);
    }
}



//http://localhost:3000/Credit/addItemCredit/2