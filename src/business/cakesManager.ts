import CakeEntity from "../entities/CakeEntity";
import CakeDto from "../dto/CakeDto";
import IDb from "../db/IDb";

class CakesManager {
  private _db: IDb;

  constructor(db: IDb) {
    this._db = db;
  }
  async getCakes(): Promise<CakeDto[]> {
    const entities = await this._db.cakesRepository().getCakes();

    const dtos = entities.map((entity: CakeEntity) => {
      const dto: CakeDto = {
        id: entity.id,
        name: entity.name
      };

      return dto;
    });

    return dtos;
  }
}

export default CakesManager;
