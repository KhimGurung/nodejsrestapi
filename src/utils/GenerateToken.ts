import jwt from 'jsonwebtoken';

/**
 * class for token generation
 */
export default class Token {
    /**
     * generate access token
     * @param publicAddress public address of the wallet
     * @returns access token
     */
    static accessToken(publicAddress: string){
        return jwt.sign({publicAddress}, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: '1s'
        });
    }

    /**
     * generate refresh token
     * @param publicAddress public address of the wallet
     * @returns refresh token
     */
    static refreshToken(publicAddress: string){
        return jwt.sign(publicAddress, process.env.REFRESH_TOKEN_SECRET as string);
    }
}