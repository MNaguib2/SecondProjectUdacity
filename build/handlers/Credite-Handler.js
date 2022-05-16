'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RemoveItemToCredit =
  exports.ShowCredit =
  exports.AddItemToCredit =
    void 0;
const Product_model_1 = require('../models/Product-model');
const express_validator_1 = require('express-validator');
const Credit_model_1 = require('../models/Credit-model');
function AddItemToCredit(req, res, next) {
  const errorMessage = (0, express_validator_1.validationResult)(req).errors;
  if (errorMessage.length < 1) {
    const idItem = req.params.id;
    const idUser = req.user.id;
    const quantity = 1;
    new Credit_model_1.CrediteModel()
      .getAllCrediteToUser(idUser)
      .then((result) => {
        if (result) {
          const idcared = result.id;
          new Credit_model_1.CrediteModel()
            .getCreditItem(idItem, idcared)
            .then((items) => {
              if (items) {
                const price = items.totalprice / items.quantity;
                const TotalQuantity = items.quantity + quantity;
                const totalprice = TotalQuantity * price;
                new Credit_model_1.CrediteModel()
                  .AddItemAgain(TotalQuantity, totalprice, items.id)
                  .then((sucessfuladd) => {
                    if (sucessfuladd) {
                      new Credit_model_1.CrediteModel().CalculateTotalPrice(
                        idcared
                      );
                      res.status(200).json({
                        message: 'Successfully Add Item'
                      });
                    } else {
                      const error = new Error(
                        `Occur Error! during add  Item to Credite 22`
                      );
                      error.name = '406 ';
                      throw error;
                    }
                  })
                  .catch((err) => {
                    return next(err);
                  });
              } else {
                new Product_model_1.ProductModel()
                  .getProductByID(idItem)
                  .then((product) => {
                    if (product) {
                      new Credit_model_1.CrediteModel()
                        .AddItemCredit({
                          id: 0,
                          id_card: idcared,
                          id_product: idItem,
                          quantity: quantity,
                          totalprice: product.price
                        })
                        .then((addedItem) => {
                          if (addedItem === 'INSERT') {
                            new Credit_model_1.CrediteModel().CalculateTotalPrice(
                              idcared
                            );
                            return res.status(200).json({
                              message: 'Add New Item Done!'
                            });
                          } else {
                            const error = new Error(
                              `Occur Error! during add new Item to Credite 25`
                            );
                            error.name = '406 ';
                            throw error;
                          }
                        })
                        .catch((err) => {
                          return next(err);
                        });
                    } else {
                      const error = new Error(
                        `Occur Error! Not Found Product With ID Sended Number ${idItem} error number 24`
                      );
                      error.name = '401 ';
                      throw error;
                    }
                  })
                  .catch((err) => {
                    return next(err);
                  });
              }
            })
            .catch((err) => {
              return next(err);
            });
        } else {
          new Product_model_1.ProductModel()
            .getProductByID(idItem)
            .then((Product) => {
              if (Product) {
                new Credit_model_1.CrediteModel()
                  .CreateNewCredit({
                    id: 0,
                    id_user: idUser,
                    totalprice: Product.price
                  })
                  .then((CreateNewID) => {
                    if (CreateNewID > 0) {
                      new Credit_model_1.CrediteModel()
                        .AddItemCredit({
                          id: 0,
                          id_card: CreateNewID,
                          id_product: idItem,
                          totalprice: Product.price,
                          quantity: quantity
                        })
                        .then((insertItemCredit) => {
                          if (insertItemCredit === 'INSERT') {
                            res.status(200).json({
                              message:
                                'Create new Credit Is Ok! and Add New Item Done!'
                            });
                          } else {
                            const error = new Error(
                              `Occur Error! during add new Item to Credite 20`
                            );
                            error.name = '406 ';
                            throw error;
                          }
                        })
                        .catch((err) => {
                          return next(err);
                        });
                    } else {
                      const error = new Error(
                        'Occur Error! Unexpected when System try Created New Credit TO you please Back TO Developer Error 19'
                      );
                      error.name = '406';
                      throw error;
                    }
                  })
                  .catch((err) => {
                    return next(err);
                  });
              } else {
                const error = new Error(
                  `Occur Error! Not Found Product With ID Sended Number ${idItem} error number 17`
                );
                error.name = '401 ';
                throw error;
              }
            })
            .catch((err) => {
              return next(err);
            });
        }
      })
      .catch((err) => {
        return next(err);
      });
  } else {
    const error = new Error(errorMessage[0].msg);
    error.name = '400';
    return next(error);
  }
}
exports.AddItemToCredit = AddItemToCredit;
function ShowCredit(req, res, next) {
  const idUser = req.user.id;
  new Credit_model_1.CrediteModel()
    .getAllCrediteToUser(idUser)
    .then((credits) => {
      if (credits) {
        new Credit_model_1.CrediteModel()
          .getALLCreditItem(credits.id)
          .then((items) => {
            if (items.length > 0) {
              res.status(200).json({
                message: 'Welcome In Cards',
                Items: items,
                Total_Price: credits.totalprice
              });
            } else {
              res.status(404).json({
                Message: 'No Items Found In this card'
              });
            }
          })
          .catch((err) => {
            return next(err);
          });
      } else {
        res.status(404).json({
          Message: 'No Credit Found!'
        });
      }
    })
    .catch((err) => {
      return next(err);
    });
}
exports.ShowCredit = ShowCredit;
function RemoveItemToCredit(req, res, next) {
  const errorMessage = (0, express_validator_1.validationResult)(req).errors;
  if (errorMessage.length < 1) {
    const idItem = req.params.id;
    const idUser = req.user.id;
    new Credit_model_1.CrediteModel()
      .getAllCrediteToUser(idUser)
      .then((Cards) => {
        if (Cards) {
          new Credit_model_1.CrediteModel()
            .DeleteItem(Cards.id, idItem)
            .then((Deleted) => {
              if (Deleted > 0) {
                new Credit_model_1.CrediteModel().CalculateTotalPrice(Cards.id);
                return res.status(200).json({
                  Message: 'Successfully! Deleted'
                });
              } else {
                const error = new Error(
                  `Occur Error! when confirm function Deleted even 27`
                );
                error.name = '406 ';
                throw error;
              }
            })
            .catch((err) => {
              return next(err);
            });
        } else {
          const error = new Error(`Occur Error!Not found Card to User 25`);
          error.name = '401 ';
          throw error;
        }
      })
      .catch((err) => {
        return next(err);
      });
  } else {
    const error = new Error(errorMessage[0].msg);
    error.name = '400';
    return next(error);
  }
}
exports.RemoveItemToCredit = RemoveItemToCredit;
//http://localhost:3000/Credit/addItemCredit/2
