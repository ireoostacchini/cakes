import CakeEntity from "../entities/CakeEntity";
import CakeDto from "../dto/CakeDto";
import IDb from "../db/IDb";
import CreateCakeDto from "../dto/CreateCakeDto";

class CakesManager {
    private _db: IDb;

    constructor(db: IDb) {
        this._db = db;
    }
    async getCakes(): Promise<CakeDto[]> {
        const entities = await this._db.cakesRepository().getCakes();

        const dtos = entities.map((entity: CakeEntity) => {
            //TODO: mapper?
            const dto: CakeDto = {
                id: entity.id,
                name: entity.name,
                comment: entity.comment,
                imageUrl: entity.imageUrl,
                yumFactor: entity.yumFactor
            };

            return dto;
        });

        return dtos;
    }

    async getCake(id: number): Promise<CakeDto> {
        const entity = await this._db.cakesRepository().getCake(id);

        const dto: CakeDto = {
            id: entity.id,
            name: entity.name,
            comment: entity.comment,
            imageUrl: entity.imageUrl,
            yumFactor: entity.yumFactor
        };

        return dto;
    }

    async deleteCake(id: number): Promise<void> {
        const entity = await this._db.cakesRepository().getCake(id);

        //if not found, ignore - idempotency for deletion
        if (!entity) {
            return;
        }

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
