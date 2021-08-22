import { ErrorRequestHandler } from "express";
import { ErrorCode } from "../constants/ErrorCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { CustomError } from "../errors/CustomError";
import { ValidationError } from "../errors/ValidationError";
import { isDevelopment } from "./configHelper";
import { createErrorResponseDto } from "./errorResponseDtoFactory";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {

    console.error(err);

    const genericErrorMessage = "Sorry, we seem to have a problem. Please try again.";

    //we decide to expose the message for validation errors
    if (err instanceof ValidationError) {

        const error = createErrorResponseDto(err.code, err.message);

        return res
            .status(HttpStatusCode.BAD_REQUEST)
            .json(error);
    }

    if (err instanceof CustomError) {

        const error = createErrorResponseDto(
            ErrorCode.InternalError,
            isDevelopment() ? err.message : genericErrorMessage);

        return res
            .status(HttpStatusCode.INTERNAL_ERROR)
            .json(error);
    }


    if (err.status === HttpStatusCode.NOT_FOUND || err.message === ErrorCode.NotFound) {
        return res.status(HttpStatusCode.NOT_FOUND).json(createErrorResponseDto(ErrorCode.NotFound, "Resource not found"));
    }

    //if we haven't explicitly returned an error, don't expose the problem to consumers
    return res.status(err.statusCode || HttpStatusCode.INTERNAL_ERROR).json({
        message: isDevelopment() ? err.message : genericErrorMessage
    });
};