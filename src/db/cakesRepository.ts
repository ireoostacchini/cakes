import CreateCakeDto from "../dto/CreateCakeDto";
import CakeEntity from "../entities/CakeEntity";
import DbConnectionManager from "./dbConnectionManager";

class CakesRepository {
    private _dbConnectionManager: DbConnectionManager;

    constructor(dbConnectionManager: DbConnectionManager) {
        this._dbConnectionManager = dbConnectionManager;
    }

    async getCakes(): Promise<CakeEntity[]> {

        const knex = this._dbConnectionManager.getKnex();
        const cakes = await knex("cakes");

        const result = cakes.map((cake: any) => {
            //TODO:mapper?
            const entity: CakeEntity = {
                id: cake.id,
                name: cake.name,
                comment: cake.comment,
                imageUrl: cake.imageUrl,
                yumFactor: cake.yumFactor
            };

            return entity;
        });

        return result;
    }

    async getCake(id: number): Promise<CakeEntity> {

        const knex = this._dbConnectionManager.getKnex();
        const cakes = await knex("cakes");

        const result = cakes.find(x => x.id === id);

        if (!id) {
            //TODO: error code
            throw new Error("Cake not found");
        }

        return result;
    }

    async deleteCake(id: number): Promise<void> {

        const knex = this._dbConnectionManager.getKnex();

        await knex("cakes").where({ id }).del();
    }

    async addCake(cake: CakeEntity): Promise<CakeEntity> {

        const knex = this._dbConnectionManager.getKnex();

        const cake2 = {
            "name": cake.name,
            "comment": cake.comment,
            "imageUrl": cake.imageUrl,
            "yumFactor": cake.yumFactor,
        }

        const xxx = await knex("cakes").insert(cake2);

        const result: CakeEntity =
        {
            id: 1111,
            name: cake.name,
            comment: cake.comment,
            imageUrl: cake.imageUrl,
            yumFactor: cake.yumFactor
        };

        return result;

    }
}

export default CakesRepository;
