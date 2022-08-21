import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import BaseError from '../errors/base_error';

interface IRequest extends Request{
    user?: Object
}

const authenticateUser = (req: IRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token: string | undefined = authHeader && authHeader.split(' ')[1];
    if(token === null) return BaseError.unauthorized("Unauthorized request.");

    jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
        if(err) return BaseError.forbidden("You dont have access permission.");
        req.user = user;
        next();
    });
}

export default authenticateUser;