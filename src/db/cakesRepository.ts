import CakeEntity from "../entities/CakeEntity";
import DbConnectionManager from "./dbConnectionManager";

class CakesRepository {
  private _dbConnectionManager: DbConnectionManager;

  constructor(dbConnectionManager: DbConnectionManager) {
    this._dbConnectionManager = dbConnectionManager;
  }

  async getCakes() {
    const knex = this._dbConnectionManager.getKnex();
    const cakes = await knex("cakes");

    const result = cakes.map((cake: any) => {
      const entity: CakeEntity = {
        id: cake.id,
        name: cake.name
      };

      return entity;
    });

    return result;
  }
}

export default CakesRepository;
