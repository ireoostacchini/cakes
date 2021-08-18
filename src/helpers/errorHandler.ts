import { ErrorRequestHandler } from "express";
import { ErrorCode } from "../constants/ErrorCode";
import { ErrorDtoCode } from "../constants/ErrorDtoCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import { createErrorResponseDto } from "./errorResponseDtoFactory";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {

    console.error(err);

    if (err.status === HttpStatusCode.NOT_FOUND || err.message === ErrorCode.NotFound) {
        return res.status(HttpStatusCode.NOT_FOUND).json(createErrorResponseDto(ErrorDtoCode.NotFound, "Resource not found"));
    }

    //if we haven't explicitly returned an error, don't expose the problem to consumers

    //TODO: hide message in prod
    return res.status(err.statusCode || HttpStatusCode.INTERNAL_ERROR).json({
        message: err.message || "Sorry, we seem to have a problem. Please try again."
    });
};