import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import BaseError from '../errors/base_error';
import TokenModel from '../models/token_model';
import GenerateToken from '../utils/GenerateToken';

/**
 * check if the given refresh token is available in the database or not
 * if refresh token is not in the database the respond with invalid credentails
 * else verify the token using the secret key used while creating it
 * if the refresh token is valid generate new access token and response with it
 * @param req api request
 * @param res response object
 * @param next next function
 */
export const getRefreshToken = async(req: Request, res: Response, next: NextFunction) => {
    const refreshToken = await TokenModel.findOne({ refreshToken: req.body.refreshToken });
    if(refreshToken){
        jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
            if(err) BaseError.success("Invalid Credentials");
            const accessToken = GenerateToken.accessToken(req.body.publicAddress);
            res.json(accessToken);
        })
    }
    else next(BaseError.success("Invalid Credentials"));
}
