import express from "express";
import IBusiness from "../business/IBusiness";

class CakesController {
  registerRoutes(router: any, business: IBusiness) {
    router.get(
      "/cakes",
      async (req: express.Request, res: express.Response, next: any) => {
        try {
          const cakes = await business.cakesManager().getCakes();

          const result = {
            files: cakes,
          };

          res.json(result);
        } catch (err) {
          next(err);
        }
      }
    );
  }
}

export default CakesController;
