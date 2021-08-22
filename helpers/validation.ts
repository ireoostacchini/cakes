import { URL } from "url";
import { ErrorCode } from "../constants/ErrorCode";
import { ValidationError } from "../errors/ValidationError";


export const validateNumber = (name: string, value: string) => {

    const number = Number(value);

    if (isNaN(number)) {
        throw new ValidationError(ErrorCode.InvalidParameter, `${name} parameter of ${value} was invalid`);
    }
}

export const validateRequiredProperties = (object: any, propertyNames: string[]) => {

    for (const paramName of propertyNames) {
        if (!object[paramName]) {
            throw new ValidationError(ErrorCode.ParameterMissing, `parameter missing: ${paramName}`);
        }
    }
}

export const validateUrl = (name: string, value: string) => {
    try {
        new URL(value);
    } catch (err) {
        throw new ValidationError(ErrorCode.InvalidParameter, `invalid parameter: ${name} must be a valid URL`);
    }
}