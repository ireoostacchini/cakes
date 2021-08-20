import CakesRepository from "../db/cakesRepository";
import IDb from "../db/IDb";
import CakeDto from "../dto/CakeDto";
import CakesManager from "./cakesManager";


const getTestCakes = (): CakeDto[] => {
    return [
        {
            id: 1,
            name: "cake 1",
            comment: "comment 1",
            imageUrl: "http://1.png",
            yumFactor: 2
        },
        {
            id: 2,
            name: "cake 2",
            comment: "comment 2",
            imageUrl: "http://2.png",
            yumFactor: 3
        }
    ]
};

describe("cakeManager", () => {
    it("should ", async () => {

        const expectedCakes = getTestCakes();

        const dbConnectionManager = { getKnex: () => undefined };

        const repository = new CakesRepository(dbConnectionManager);

        repository.getCakes = jest.fn(() => Promise.resolve(expectedCakes));

        const db: IDb = {
            dbConnectionManager,
            cakesRepository: () => repository
        }

        const manager = new CakesManager(db);

        const cakes = await manager.getCakes();

        expect(cakes).toEqual(expectedCakes);

    });
});