import { ErrorCode } from "../constants/ErrorCode";

export const validateRequiredProperty = (
    obj: any,
    propertyName: string
): void => {
    if (!obj[propertyName]) {
        throw new Error(ErrorCode.ParameterMissing);
    }
};