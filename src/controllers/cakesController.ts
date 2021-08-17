import express from "express";
import IBusiness from "../business/IBusiness";
import { HttpStatusCodes } from "../constants/HttpStatusCodes";
import CreateCakeDto from "../dto/CreateCakeDto";

interface CreateCakeRequestDto {
    cake: CreateCakeDto;
}

class CakesController {
    registerRoutes(router: any, business: IBusiness) {

        router.get(
            "/cakes/:id",
            async (req: express.Request, res: express.Response, next: any) => {
                try {

                    const cakeId = Number(req.params.id);

                    const cakes = await business.cakesManager().getCake(cakeId);

                    const result = {
                        files: cakes,
                    };

                    res.status(HttpStatusCodes.OK).json(result);
                } catch (err) {
                    next(err);
                }
            });

        router.get(
            "/cakes",
            async (req: express.Request, res: express.Response, next: any) => {
                try {
                    const cakes = await business.cakesManager().getCakes();

                    const result = {
                        cakes: cakes,
                    };

                    res.status(HttpStatusCodes.OK).json(result);

                } catch (err) {
                    next(err);
                }
            },

        );

        router.delete(
            "/cakes/:id",
            async (req: express.Request, res: express.Response, next: any) => {
                try {

                    const cakeId = Number(req.params.id);

                    const cakes = await business.cakesManager().deleteCake(cakeId);


                    res.status(HttpStatusCodes.OK).json({});
                } catch (err) {
                    next(err);
                }
            });

        router.post(
            "/cakes",
            async (req: CreateCakeRequestDto, res: express.Response, next: any) => {
                try {

                    const cake2 = {
                        "name": "cake.name",
                        "comment": "cake.comment",
                        "imageUrl": "cake.imageUrl",
                        "yumFactor": 2,
                    }

                    const addedCake = await business.cakesManager().addCake(cake2);

                    const result = {
                        cake: addedCake,
                    };

                    res.status(HttpStatusCodes.CREATED).json(result);
                } catch (err) {
                    next(err);
                }
            });
    }
}


export default CakesController;
