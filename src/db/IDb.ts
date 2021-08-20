import CakesRepository from "./cakesRepository";
import DbConnectionManager from "./dbConnectionManager";
import IDbConnectionManager from "./IDbConnectionManager";

interface IDb {
  dbConnectionManager: IDbConnectionManager;

  cakesRepository(): CakesRepository;
}

export default IDb;
