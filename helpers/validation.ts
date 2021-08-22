import { URL } from "url";
import { ErrorCode } from "../constants/ErrorCode";


//TODO: delete
export const validateUrl = (url: string) => {
    try {
        new URL(url);
    } catch (e) {
        throw new Error(ErrorCode.InvalidParameter);
    }
};