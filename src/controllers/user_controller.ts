import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/base_error';
import UserModel from "../models/user_model";
import dbErrorHandler from '../utils/DBErrorHandler';
import GenerateToken from '../utils/GenerateToken';
import TokenModel from '../models/token_model';

export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find({ username: req.query.public_address });
    res.send(users);
}

/**
 * register the user, create access and refresh token 
 * store the refresh token for future use and response back with details
 * @param req 
 * @param res 
 * @param next 
 */
export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        /** create new user in the database */
        const user = await UserModel.create({
            name: req.body.name,
            username: req.body.username
        });

        /** generate access and refresh token */
        const accessToken = GenerateToken.accessToken(req.body.username);
        const refreshToken = GenerateToken.refreshToken(req.body.username);

        /** store refresh token in the database for future use */
        await TokenModel.create({ refreshToken: refreshToken, user: user!._id });
        res.send({
            success: true,
            message: "User has successfully registered.",
            data:{
                accessToken,
                refreshToken,
                user
            }
        });
    }catch(error: any){
        if(error.code)
            next(BaseError.success("Account with this detail already exist."));
        const errors = dbErrorHandler(error);
        next(BaseError.success(errors.toString()));
    }
}

