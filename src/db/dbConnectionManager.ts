import config from "../config";
import knex from "knex";
import IDbConnectionManager from "./IDbConnectionManager";
import { injectable } from "inversify";

@injectable()
class DbConnectionManager implements IDbConnectionManager {

  //TODO: separate knex instance per request? the connections would still mount up
  static knexConfig = knex({
    client: "pg",
    connection: {
      host: config.get("db.host"),
      database: config.get("db.name"),
      user: config.get("db.user"),
      password: config.get("db.password"),
    },
    searchPath: ["public"],
  });

  getKnex() {
    return DbConnectionManager.knexConfig;
  }

}

export default DbConnectionManager;
