import { Request } from "express"
import { User } from "./models/User-model"
export interface IGetUserAuthInfoRequest extends Request {
  user: User // or any other type
}
export interface GetErrors {
  errors: [{value: string , msg: string, param: string, location: string}] // or any other type
}