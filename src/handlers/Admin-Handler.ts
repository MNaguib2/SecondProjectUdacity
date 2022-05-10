import { NextFunction, Response, Request } from 'express';
import { AdminModel } from '../models/Admin-model';
import { IGetUserAuthInfoRequest } from '../definitionfile';

export function changestatueHandler(req: Request, res: Response, next: NextFunction) {
    const statue: number = (req as IGetUserAuthInfoRequest).user.statue == 1 ? 2 : 1;
    new AdminModel().changeStatue(statue, (req as IGetUserAuthInfoRequest).user.id)
        .then(reschangestatue => {
            if (reschangestatue === 'UPDATE') {
                res.status(200).json({
                    message: 'Successfull Change Update Your statue is ' + (statue == 1 ? 'online' : 'offline')
                })
            } else {
                const error = new Error('Occur Error! In change Unexpected Plese return to Develop');
                error.name = '409';
                throw error;
            }
        }).catch(err => {
            return next(err)
        })
}

export function UpgreadUser (req: Request, res: Response, next:NextFunction) {
    const id = req.body.id;
    const typeuser = req.body.typeuser;
    if (typeuser > 3 || typeuser < 2) {
        const error = new Error('Occur Error! Please Add Type User Correct');
        error.name = '409';
        return next(error);
    }
    new AdminModel().UpgredUser(typeuser , id)
    .then(result => {
        if (result === 'UPDATE') {
            res.status(200).json({
                message: 'Successfull Upgrade User'
            })
        }else {
            const error = new Error('Occur Error! In change Unexpected Plese return to Develop');
                error.name = '409';
                throw error;
        }
    }).catch(err => {
        return next(err);
    })
}