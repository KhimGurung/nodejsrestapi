import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import BaseError from '../errors/base_error';

const errorHandler: ErrorRequestHandler = (
    error: any | BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const httpCode = error.httpCode || 500;
    const message = error.message;

    if(error instanceof BaseError){
        return res.status(httpCode).send({
            message: message,
            success: false,
            data: null
        })
    }

    res.status(httpCode).send({
        message: "The problem is on our end. We are working on fixing it.",
        success: false,
        data: null
    })
}

export default errorHandler