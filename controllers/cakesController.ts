import { Request, Response } from "express";
import IBusiness from "../business/IBusiness";
import { ErrorCode } from "../constants/ErrorCode";
import { ErrorDtoCode } from "../constants/ErrorDtoCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import CreateCakeDto from "../dto/CreateCakeDto";
import { createErrorResponseDto, ErrorResponseDto } from "../helpers/errorResponseDtoFactory";
import { validateUrl, validateRequiredProperty } from "../helpers/validation";

interface CreateCakeRequest extends Request {
    cake: CreateCakeDto;
}

export class CustomError extends Error {

    code: ErrorCode;

    constructor(code: ErrorCode, message: string) {

        super(message);
        this.name = "Error";
        this.code = code;
    }
}

export class ValidationError extends CustomError {
};

const validateNumber = (name: string, value: string) => {

    const number = Number(value);

    if (isNaN(number)) {

        throw new ValidationError(ErrorCode.InvalidParameter, `${name} parameter of ${value} was invalid`);
    }
}

const validateRequiredProperties = (object: any, propertyNames: string[]): ErrorResponseDto | undefined => {

    for (const paramName of propertyNames) {
        try {
            validateRequiredProperty(object, paramName);
        } catch (err) {
            return createErrorResponseDto(ErrorDtoCode.ParameterMissing, `parameter missing: ${paramName}`);
        }
    }
}

const validatePropertyAsUrl = (name: string, value: string): ErrorResponseDto | undefined => {

    try {
        validateUrl(value);
    } catch (err) {

        const error = createErrorResponseDto(ErrorDtoCode.InvalidParameter, `invalid parameter: ${name} must be a valid URL`);

        return error;
    }
}





class CakesController {
    registerRoutes(router: any, business: IBusiness) {

        router.get(
            "/cakes/:id",
            async (req: Request, res: Response, next: any) => {
                try {

                    const cakeId = Number(req.params.id);

                    validateNumber("id", req.params.id);

                    const cake = await business.cakesManager().getCake(cakeId);

                    const result = {
                        cake
                    };

                    res.status(HttpStatusCode.OK).json(result);
                } catch (err) {

                    next(err);
                }
            });

        router.get(
            "/cakes",
            async (req: Request, res: Response, next: any) => {
                try {
                    const cakes = await business.cakesManager().getCakes();

                    const result = {
                        cakes
                    };

                    res.status(HttpStatusCode.OK).json(result);

                } catch (err) {
                    next(err);
                }
            },

        );

        router.delete(
            "/cakes/:id",
            async (req: Request, res: Response, next: any) => {
                try {

                    const cakeId = Number(req.params.id);

                    validateNumber("id", req.params.id);

                    const cakes = await business.cakesManager().deleteCake(cakeId);

                    res.status(HttpStatusCode.OK).json({});
                } catch (err) {

                    if (err instanceof ValidationError) {

                        const error = createErrorResponseDto(ErrorDtoCode.InvalidParameter, err.message);

                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
                    }

                    next(err);
                }
            });

        router.post(
            "/cakes",
            async (req: CreateCakeRequest, res: Response, next: any) => {
                try {
                    const cake: CreateCakeDto = req?.body?.cake;

                    //validate top-level object
                    if (!cake) {
                        const error = createErrorResponseDto(ErrorDtoCode.InvalidParameter, "invalid parameter - top-level 'cake' object required");

                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
                    }

                    //validate required params 
                    const requiredError = validateRequiredProperties(cake, [
                        "name",
                        "comment",
                        "imageUrl",
                        "yumFactor"
                    ]);

                    if (requiredError) {
                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(requiredError);
                    }

                    //validate imageUrl 
                    const urlError = validatePropertyAsUrl("imageUrl", cake.imageUrl);

                    if (urlError) {
                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(urlError);
                    }

                    //validate yumFactor - must be 1 to 5
                    const yumFactor = Number(cake.yumFactor);

                    if (isNaN(yumFactor) || yumFactor < 1 || yumFactor > 5) {
                        const error = createErrorResponseDto(ErrorDtoCode.InvalidParameter, `invalid parameter: yumFactor must be netween 1 and 5`);

                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
                    }

                    const addedCake = await business.cakesManager().addCake(cake);

                    const result = {
                        cake: addedCake,
                    };

                    res.status(HttpStatusCode.CREATED).json(result);
                } catch (err) {
                    next(err);
                }
            });
    }
}


export default CakesController;
