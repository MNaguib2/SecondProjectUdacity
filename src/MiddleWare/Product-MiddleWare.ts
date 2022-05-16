import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserModel, User } from '../models/User-model';
import { IGetUserAuthInfoRequest } from '../definitionfile';

dotenv.config();

export function productmiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.get('Token');
  jwt.verify(<string>token, <string>process.env.PassWordDev, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: 'Occur Error! In Token Please Back To Developer '
      });
      return console.log(err);
    }
    const decodedPayload: jwt.JwtPayload = decoded as jwt.JwtPayload;
    if (Date.now() < (decodedPayload.exp as number)) {
      new UserModel()
        .FindUserByEmail(decodedPayload.email)
        .then((result) => {
          if (
            result &&
            result.typeuser !== 3 &&
            result.token === decodedPayload.Token
          ) {
            new UserModel()
              .FindBytypeuser(1)
              .then((resultStatue) => {
                if (resultStatue && resultStatue.statue == 1) {
                  (req as IGetUserAuthInfoRequest).user = result;
                  return next();
                } else {
                  const error = new Error(
                    'Occur Error! Store offline Now Pleasw Back to stakeholders'
                  );
                  error.name = '407';
                  throw error;
                }
              })
              .catch((err) => {
                return next(err);
              });
          } else {
            const error = new Error(
              'Occur Error! UnAuthentication to access this url please try again'
            );
            error.name = '401';
            throw error;
          }
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      const error = new Error(
        'Occur Error! Session Terminated Please Try Login'
      );
      error.name = '408';
      return next(error);
    }
  });
}
