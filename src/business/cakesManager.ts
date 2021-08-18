import CakeEntity from "../entities/CakeEntity";
import CakeDto from "../dto/CakeDto";
import IDb from "../db/IDb";
import CreateCakeDto from "../dto/CreateCakeDto";
import { cakeEntityToDto } from "../mappers/cakeMapper";
import { ErrorCode } from "../constants/ErrorCode";

class CakesManager {
    private _db: IDb;

    constructor(db: IDb) {
        this._db = db;
    }
    async getCakes(): Promise<CakeDto[]> {
        const entities = await this._db.cakesRepository().getCakes();

        const dtos = entities.map((entity: CakeEntity) => {
            return cakeEntityToDto(entity);
        });

        return dtos;
    }

    async getCake(id: number): Promise<CakeDto> {
        const entity = await this._db.cakesRepository().getCake(id);

        const dto = cakeEntityToDto(entity);

        return dto;
    }

    async deleteCake(id: number): Promise<void> {

        await this._db.cakesRepository().deleteCake(id);
    }

    async addCake(cake: CreateCakeDto): Promise<CakeDto> {

        const entity: CakeEntity = {
            name: cake.name,
            comment: cake.comment,
            imageUrl: cake.imageUrl,
            yumFactor: cake.yumFactor
        }

        const result: CakeDto = await this._db.cakesRepository().addCake(entity);

        return result;
    }
}

export default CakesManager;
