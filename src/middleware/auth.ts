import { Response, Request, NextFunction } from 'express';
import BaseError from '../errors/base_error';
import VerifyToken from '../utils/verify_token';

const userAuthorization  = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) 
            return next({code:403, message: "Access denied"});

        const token = authHeader?.split(" ")[1];
        const verifyToken = new VerifyToken(token);
        const isValid = await verifyToken.isValidToken("google");
        if(!isValid)
            return next(new BaseError(403, "Invalid token, access"));
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}

export default userAuthorization;