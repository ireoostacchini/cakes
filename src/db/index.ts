import CakesRepository from "./cakesRepository";
import DbConnectionManager from "./dbConnectionManager";
import IDb from "./IDb";
import { injectable, inject } from "inversify";
import { TYPES } from "../constants/types";
import IDbConnectionManager from "./IDbConnectionManager";

@injectable()
class Db implements IDb {
  dbConnectionManager: IDbConnectionManager;

  constructor(
    @inject(TYPES.IDbConnectionManager) dbConnectionManager: IDbConnectionManager
  ) {
    this.dbConnectionManager = dbConnectionManager;
  }

  cakesRepository(): CakesRepository {
    return new CakesRepository(this.dbConnectionManager);
  }
}
export default Db;
