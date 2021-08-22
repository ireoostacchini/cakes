import { injectable, inject } from "inversify";
import "reflect-metadata";
import CakesManager from "./cakesManager";
import Db from "../db";
import IBusiness from "./IBusiness";
import IDb from "../db/IDb";
import { Types } from "../constants/Types";

@injectable()
class Business implements IBusiness {
  private _db: Db;

  constructor(@inject(Types.IDb) db: IDb) {
    this._db = db;
  }

  cakesManager(): CakesManager {
    return new CakesManager(this._db);
  }
}
export default Business;
