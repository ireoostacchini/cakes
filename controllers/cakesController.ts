import { Request, Response } from "express";
import IBusiness from "../business/IBusiness";
import { ErrorCode } from "../constants/ErrorCode";
import { HttpStatusCode } from "../constants/HttpStatusCode";
import CreateCakeDto from "../dto/CreateCakeDto";
import { ValidationError } from "../errors/ValidationError";
import { createErrorResponseDto } from "../helpers/errorResponseDtoFactory";
import { validateNumber, validateRequiredProperties, validateUrl } from "../helpers/validation";

interface CreateCakeRequest extends Request {
    cake: CreateCakeDto;
}

const validateYumFactor = (yumFactor: number) => {
    if (isNaN(yumFactor) || yumFactor < 1 || yumFactor > 5) {
        throw new ValidationError(ErrorCode.InvalidParameter, `invalid parameter: yumFactor must be between 1 and 5`);
    }
}

class CakesController {
    registerRoutes(router: any, business: IBusiness) {

        router.get(
            "/cakes/:id",
            async (req: Request, res: Response, next: any) => {
                try {

                    validateNumber("id", req.params.id);

                    const cakeId = Number(req.params.id);

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

                    validateNumber("id", req.params.id);

                    const cakeId = Number(req.params.id);

                    await business.cakesManager().deleteCake(cakeId);

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
                        const error = createErrorResponseDto(ErrorCode.InvalidParameter, "invalid parameter - top-level 'cake' object required");

                        return res
                            .status(HttpStatusCode.BAD_REQUEST)
                            .json(error);
                    }

                    //validate required params 
                    validateRequiredProperties(cake, [
                        "name",
                        "comment",
                        "imageUrl",
                        "yumFactor"
                    ]);

                    //validate imageUrl 
                    validateUrl("imageUrl", cake.imageUrl);

                    //validate yumFactor - must be 1 to 5
                    const yumFactor = Number(cake.yumFactor);

                    validateYumFactor(yumFactor);

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
