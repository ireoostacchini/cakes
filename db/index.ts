import CakesRepository from "./cakesRepository";
import DbConnectionManager from "./dbConnectionManager";
import IDb from "./IDb";
import { injectable, inject } from "inversify";
import IDbConnectionManager from "./IDbConnectionManager";
import { Types } from "../constants/types";

@injectable()
class Db implements IDb {
  dbConnectionManager: IDbConnectionManager;

  constructor(
    @inject(Types.IDbConnectionManager) dbConnectionManager: IDbConnectionManager
  ) {
    this.dbConnectionManager = dbConnectionManager;
  }

  cakesRepository(): CakesRepository {
    return new CakesRepository(this.dbConnectionManager);
  }
}
export default Db;
