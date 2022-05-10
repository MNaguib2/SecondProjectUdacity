import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/User-model';
import * as bcrybt from 'bcryptjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { validationResult } from 'express-validator';
import { GetErrors } from '../definitionfile';
dotenv.config();


export function signuphandler(req: Request, res: Response, next : NextFunction) {
    const errorMessage = (validationResult(req) as unknown as GetErrors).errors;
    if (errorMessage.length < 1) {
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    new UserModel().getAll()
        .then(result => {
            if (result.length > 0) {
                const found = result.find(element => element.email === email);
                if (found) {
                    return res.status(406).json({
                        message: "this Email Already Registered"
                    });
                } else {
                    const hashOassword = bcrybt.hashSync(password, 12);
                    new UserModel().AddUser({ name: name, email: email, password: hashOassword, typeuser: 3, statue: 0, id: 0, token: null })
                        .then(added => {
                            console.log("Successfully!! Add number Users " + added);
                            return res.status(201).json({
                                message: "Successfully! Created User Client",
                                welcome: "Welcome! " + name
                            });
                        })
                }
            } else {
                const hashOassword = bcrybt.hashSync(password, 12);
                new UserModel().AddAdmin({ name: name, email: email, password: hashOassword,
                    typeuser : 1, statue: 2, id: 1, token: null })
                    .then(added => {
                        console.log("Successfully!! Add number Users " + added);
                        return res.status(201).json({
                            message: "Successfully! Created User Admin",
                            welcome: "Welcome! " + name
                        });
                    }).catch(err => {
                        console.log('Occur Error! ' + err);
                    })
            }
        }).catch(err => {
            console.log('Occur Error! ' + err);
        })
    } else {
        const error = new Error(errorMessage[0].msg);
        error.name = '400';
        return next(error);
    }
}

export function SignIn(req: Request, res: Response, next: NextFunction) {
    const errorMessage = (validationResult(req) as unknown as GetErrors).errors;
    if (errorMessage.length < 1) {
    const email = req.body.email;
    const password = req.body.password;
    new UserModel().FindUserByEmail(email)
    .then(result => {
        if (result && bcrybt.compareSync(password, result.password)) {
            const TokenGen = crypto.randomBytes(8).toString('hex');            
            const token = jwt.sign({ Token: TokenGen , email : result.email }, <string>process.env.PassWordDev,
                {expiresIn : Date.now() - (3600000 * 458)});
                new UserModel().AddUserToken(TokenGen , result.id)
                .then(() => {
                    return res.status(202).json({                
                        message: "Successfully!! Login",
                        welcome: "Welcome! " + result.name,
                        Token : token
                    })
                }).catch(err => {
                    return next(err);
                })
           
        } else {
            const error = new Error('Occur Error! this Email or Password Incorrect');
            error.name = '404'; 
            throw error;
        }
    }).catch(err => {
        return next(err);
    })
} else {
    const error = new Error(errorMessage[0].msg);
    error.name = '400';
    return next(error);
}
}
/*
{
    "password" : "123",
     "email" : "test@test.com",
      "name" : "mena afefe"    
}
*/