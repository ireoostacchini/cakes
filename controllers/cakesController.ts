import { Request, Response } from "express";
import IBusiness from "../business/IBusiness";
import { ErrorDtoCode } from "../constants/ErrorDtoCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import CreateCakeDto from "../dto/CreateCakeDto";
import { createErrorResponseDto, ErrorResponseDto } from "../helpers/errorResponseDtoFactory";
import { validateUrl, validateRequiredProperty } from "../helpers/validation";

interface CreateCakeRequest extends Request {
    cake: CreateCakeDto;
}

const validateNumber = (name: string, value: string): ErrorResponseDto | undefined => {

    const number = Number(value);

    if (isNaN(number)) {

        const error = createErrorResponseDto(ErrorDtoCode.InvalidParameter, `${name} parameter of ${value} was invalid`);

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

                    const error = validateNumber("id", req.params.id);

                    if (error) {
                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
                    }

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

                    const error = validateNumber("id", req.params.id);

                    if (error) {
                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
                    }

                    const cakes = await business.cakesManager().deleteCake(cakeId);

                    res.status(HttpStatusCode.OK).json({});
                } catch (err) {
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
                        const error = createErrorResponseDto(ErrorDtoCode.InvalidRequest, "invalid request - top-level 'cake' object required");

                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
                    }

                    //validate required params 
                    for (const paramName of [
                        "name",
                        "comment",
                        "imageUrl",
                        "yumFactor"
                    ]) {
                        try {
                            validateRequiredProperty(cake, paramName);
                        } catch (err) {
                            const error = createErrorResponseDto(ErrorDtoCode.ParameterMissing, `parameter missing: ${paramName}`);

                            return res
                                .status(HttpStatusCode.BAD_REQUEST)
                                .json(error);
                        }
                    }

                    //validate imageUrl 
                    try {
                        validateUrl(cake.imageUrl)
                    } catch (err) {

                        const error = createErrorResponseDto(ErrorDtoCode.InvalidParameter, `invalid parameter: imageUrl must be a valid URL`);

                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
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
