import CakesController from "./cakesController";
import IBusiness from "../business/IBusiness";

class Controllers {
  registerRoutes(router: any, business: IBusiness) {
    new CakesController().registerRoutes(router, business);
  }
}

export default Controllers;