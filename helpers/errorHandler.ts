import { ErrorRequestHandler } from "express";
import { ErrorCode } from "../constants/ErrorCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { CustomError } from "../errors/CustomError";
import { ValidationError } from "../errors/ValidationError";
import { isDevelopment } from "./configHelper";
import { createErrorResponseDto } from "./errorResponseDtoFactory";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {

    const genericErrorMessage = "Sorry, we seem to have a problem. Please try again.";

    console.error(err);

    //we're not exposing all CustomErrors now, although we could choose to do so (or perhaps have smething like a PublicCustomError) 
    if (err instanceof ValidationError) {

        const error = createErrorResponseDto(ErrorCode.InvalidParameter, err.message);

        return res
            .status(HttpStatusCode.BAD_REQUEST)
            .json(error);
    }

    if (err instanceof CustomError) {

        const error = createErrorResponseDto(ErrorCode.InternalError, genericErrorMessage);

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