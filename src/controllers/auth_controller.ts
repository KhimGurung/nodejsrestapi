import { Request, Response, NextFunction } from 'express';
import Web3 from 'web3';
import crypto from 'crypto';
import BaseError from '../errors/base_error';
import TokenModel from '../models/token_model';
import UserModel from "../models/user_model";
import GenerateToken from '../utils/GenerateToken';


export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    /** if user with the received public address is found then response with user detail*/
    const users = await UserModel.find({ username: req.body.publicAddress });
    if(users.length > 0){
        res.send({
            message: "User with the given detail found.",
            success: true,
            data: users[0]
        });
    }
    else next(new BaseError(200, "Invalid Credentials"));
}

export const authenticateUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const web3 = new Web3('https://cloudflare-eth.com');
        const user = await UserModel.findOne({ username: req.body.publicAddress });
        if(!user) throw Error("User not found.");

        /** recover the public address of the wallet using nonce from the database and signature received from the api request */
        const publicAddress = web3.eth.accounts.recover(user!.nonce, req.body.signature);

        /**
         * if public address from the database user i.e username matches the public address that is recovered user is authentic
         * else return error
         */
        if(user!.username.toLowerCase() === publicAddress.toLowerCase()){
            /** generate access and refresh token for the user and update the nonce in the database and send the response */
            const accessToken = GenerateToken.accessToken(publicAddress);
            const refreshToken = GenerateToken.refreshToken(publicAddress);
            
            /** add the refresh token to the database for future use */
            await TokenModel.create({ refreshToken: refreshToken, user: user!._id });

            /** crate new nonce and update in the database for next authentication */
            user!.nonce = crypto.randomBytes(60).toString('hex');
            user?.save();

            res.send({
                success: true,
                message: "Login successful",
                data: {
                    accessToken,
                    refreshToken,
                    user
                }
            });
        }
        else next(new BaseError(200, "Invalid Credentials"));
    }catch(error: any){
        next(new BaseError(200, error.message ? error.message : "Invalid Credentails"));
    }
}
