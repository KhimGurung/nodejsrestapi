import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/base_error';

export const authenticateValidator = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.signature && req.body.publicAddress)
        next()
    else next(BaseError.badRequest("Necessary data not provided."));
}