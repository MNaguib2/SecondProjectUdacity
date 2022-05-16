import { Request, Response } from 'express';
import { Product } from './models/Product-model';
import { CrediteItem } from './models/Credit-model';
import { User } from './models/User-model';
export interface IGetUserAuthInfoRequest extends Request {
  user: User; // or any other type
}
export interface GetErrors {
  errors: [{ value: string; msg: string; param: string; location: string }]; // or any other type
}
export interface ResponseExpres extends Response {
  _body: {
    message: string;
    Token: string;
    welcome: string;
    users: User[];
    Products: Product[];
    Items: CrediteItem;
  };
}
