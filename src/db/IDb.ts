import CakesRepository from "./cakesRepository";
import DbConnectionManager from "./dbConnectionManager";

interface IDb {
  dbConnectionManager: DbConnectionManager;

  cakesRepository(): CakesRepository;
}

export default IDb;
