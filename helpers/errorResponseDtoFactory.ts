import { ErrorCode } from "../constants/ErrorCode";

export interface ErrorResponseDto {
    code: ErrorCode;
    message: string;
}

export function createErrorResponseDto(code: ErrorCode, message: string) {

    const result: ErrorResponseDto = {
        code,
        message
    };

    return result;
}