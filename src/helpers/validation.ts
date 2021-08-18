import { URL } from "url";
import { ErrorCode } from "../constants/ErrorCode";

export const validateRequiredProperty = (
    obj: any,
    propertyName: string
): void => {
    if (!obj[propertyName]) {
        throw new Error(ErrorCode.ParameterMissing);
    }
};

export const validateUrl = (url: string) => {
    try {
        new URL(url);
    } catch (e) {
        throw new Error(ErrorCode.InvalidParameter);
    }
};