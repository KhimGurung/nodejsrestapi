import { HttpStatusCode } from "../ResponseMessages/HttpStatusCode";

export default class BaseError extends Error{
    httpCode: number;
    message: string;

    constructor(httpCode: number, message: string){
        super();
        this.httpCode = httpCode;
        this.message = message;
    }

    static badRequest(message: string){
        return new BaseError(HttpStatusCode.BAD_REQUEST, message);
    }

    static internal(message: string){
        return new BaseError(HttpStatusCode.INTERNAL_SERVER, message);
    }

    static notFound(message: string){
        return new BaseError(HttpStatusCode.NOT_FOUND, message);
    }

    static success(message: string){
        return new BaseError(HttpStatusCode.OK, message);
    }

    static unauthorized(message: string){
        return new BaseError(HttpStatusCode.UNAUTHORIZED, message);
    }

    static forbidden(message: string){
        return new BaseError(HttpStatusCode.FORBIDDEN, message);
    }
}