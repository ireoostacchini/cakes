import { ErrorDtoCode } from "../constants/ErrorDtoCode";

export interface ErrorResponseDto {
    message: string;
    code: ErrorDtoCode;
}

export function createErrorResponseDto(code: ErrorDtoCode, message: string) {

    const result: ErrorResponseDto = {
        code,
        message
    };

    return result;
}