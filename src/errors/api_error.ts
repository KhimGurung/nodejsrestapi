import { BaseError } from "./base_error";

export class APIError extends BaseError{
    constructor(httpCode: number, message: string){
        super(httpCode, message)
    }
}