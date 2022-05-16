import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserModel, User } from '../models/User-model';
import { IGetUserAuthInfoRequest } from '../definitionfile';

dotenv.config();

export function AdminMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.get('Token');
  jwt.verify(<string>token, <string>process.env.PassWordDev, (err, decoded) => {
    if (err) {
      res
        .status(401)
        .json({
          message:
            'Occur Error! Please Back To Developer number 1 Please Try another URL'
        })
        .redirect('/');
      return console.log(err);
    }
    const email = (decoded as jwt.JwtPayload).email;
    const token = (decoded as jwt.JwtPayload).Token as string;
    const numberexpiration: number = (decoded as jwt.JwtPayload).exp as number;

    if (Date.now() < numberexpiration) {
      new UserModel()
        .FindUserByEmail(email)
        .then((resultUser: User) => {
          if (
            resultUser &&
            resultUser.typeuser === 1 &&
            resultUser.token === token
          ) {
            (req as IGetUserAuthInfoRequest).user = resultUser;
            return next();
          } else {
            const error = new Error(
              'Occur Error! UnAuthentication Please Try Change URL number 2'
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
        'Occur Error! UnAuthentication Session is Terminate Please Try Login number 3'
      );
      error.name = '401';
      return next(error);
    }
  });
}
