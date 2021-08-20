import { ErrorCode } from "../constants/ErrorCode";
import CakeEntity from "../entities/CakeEntity";
import DbConnectionManager from "./dbConnectionManager";
import IDbConnectionManager from "./IDbConnectionManager";

class CakesRepository {
    private _dbConnectionManager: IDbConnectionManager;

    constructor(dbConnectionManager: IDbConnectionManager) {
        this._dbConnectionManager = dbConnectionManager;
    }

    async getCakes(): Promise<CakeEntity[]> {

        const knex = this._dbConnectionManager.getKnex();
        const cakes = await knex("cakes");

        const result = cakes.map((cake: any) => {

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

        const result = cakes.find((x: { id: number; }) => x.id === id);

        if (!result) {
            throw new Error(ErrorCode.NotFound);
        }

        return result;
    }

    async deleteCake(id: number): Promise<void> {

        const knex = this._dbConnectionManager.getKnex();

        await knex("cakes").where({ id }).del();
    }

    async addCake(cake: CakeEntity): Promise<CakeEntity> {

        const knex = this._dbConnectionManager.getKnex();

        const cakeInfo = {
            "name": cake.name,
            "comment": cake.comment,
            "imageUrl": cake.imageUrl,
            "yumFactor": cake.yumFactor,
        }

        const ids = await knex("cakes").insert(cakeInfo).returning("id");

        const result: CakeEntity =
        {
            id: ids[0],
            name: cake.name,
            comment: cake.comment,
            imageUrl: cake.imageUrl,
            yumFactor: cake.yumFactor
        };

        return result;

    }
}

export default CakesRepository;
