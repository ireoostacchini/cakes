import CakesRepository from "./cakesRepository";
import IDb from "./IDb";
import IDbConnectionManager from "./IDbConnectionManager";

class Db implements IDb {
  dbConnectionManager: IDbConnectionManager;

  constructor(
    dbConnectionManager: IDbConnectionManager
  ) {
    this.dbConnectionManager = dbConnectionManager;
  }

  cakesRepository(): CakesRepository {
    return new CakesRepository(this.dbConnectionManager);
  }
}
export default Db;
