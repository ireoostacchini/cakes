import { ErrorCode } from "../constants/ErrorCode";

export class CustomError extends Error {

    code: ErrorCode;

    constructor(code: ErrorCode, message: string) {

        super(message);
        this.name = "Error";
        this.code = code;
    }
}