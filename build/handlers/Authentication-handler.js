'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SignIn = exports.signuphandler = void 0;
const User_model_1 = require('../models/User-model');
const bcrybt = __importStar(require('bcryptjs'));
const crypto = __importStar(require('crypto'));
const jwt = __importStar(require('jsonwebtoken'));
const dotenv = __importStar(require('dotenv'));
const express_validator_1 = require('express-validator');
dotenv.config();
function signuphandler(req, res, next) {
  const errorMessage = (0, express_validator_1.validationResult)(req).errors;
  if (errorMessage.length < 1) {
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    new User_model_1.UserModel()
      .getAll()
      .then((result) => {
        if (result.length > 0) {
          const found = result.find((element) => element.email === email);
          if (found) {
            return res.status(406).json({
              message: 'this Email Already Registered'
            });
          } else {
            const hashOassword = bcrybt.hashSync(password, 12);
            new User_model_1.UserModel()
              .AddUser({
                name: name,
                email: email,
                password: hashOassword,
                typeuser: 3,
                statue: 0,
                id: 0,
                token: null
              })
              .then((added) => {
                console.log('Successfully!! Add number Users ' + added);
                return res.status(201).json({
                  message: 'Successfully! Created User Client',
                  welcome: 'Welcome! ' + name
                });
              });
          }
        } else {
          const hashOassword = bcrybt.hashSync(password, 12);
          new User_model_1.UserModel()
            .AddAdmin({
              name: name,
              email: email,
              password: hashOassword,
              typeuser: 1,
              statue: 2,
              id: 1,
              token: null
            })
            .then((added) => {
              console.log('Successfully!! Add number Users ' + added);
              return res.status(201).json({
                message: 'Successfully! Created User Admin',
                welcome: 'Welcome! ' + name
              });
            })
            .catch((err) => {
              console.log('Occur Error! ' + err);
            });
        }
      })
      .catch((err) => {
        console.log('Occur Error! ' + err);
      });
  } else {
    const error = new Error(errorMessage[0].msg);
    error.name = '400';
    return next(error);
  }
}
exports.signuphandler = signuphandler;
function SignIn(req, res, next) {
  const errorMessage = (0, express_validator_1.validationResult)(req).errors;
  if (errorMessage.length < 1) {
    const email = req.body.email;
    const password = req.body.password;
    new User_model_1.UserModel()
      .FindUserByEmail(email)
      .then((result) => {
        if (result && bcrybt.compareSync(password, result.password)) {
          const TokenGen = crypto.randomBytes(8).toString('hex');
          const token = jwt.sign(
            { Token: TokenGen, email: result.email },
            process.env.PassWordDev,
            { expiresIn: Date.now() - 3600000 * 458 }
          );
          new User_model_1.UserModel()
            .AddUserToken(TokenGen, result.id)
            .then(() => {
              return res.status(202).json({
                message: 'Successfully!! Login',
                welcome: 'Welcome! ' + result.name,
                Token: token
              });
            })
            .catch((err) => {
              return next(err);
            });
        } else {
          const error = new Error(
            'Occur Error! this Email or Password Incorrect'
          );
          error.name = '404';
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
exports.SignIn = SignIn;
/*
{
    "password" : "123",
     "email" : "test@test.com",
      "name" : "mena afefe"
}
*/
