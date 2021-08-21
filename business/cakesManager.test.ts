import CakesRepository from "../db/cakesRepository";
import IDb from "../db/IDb";
import CakeDto from "../dto/CakeDto";
import CakesManager from "./cakesManager";
import { Mock, It, Times } from "moq.ts";


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

    it("should get cakes", async () => {

        //arrange
        const expectedCakes = getTestCakes();

        const db = new Mock<IDb>()
            .setup(instance => instance.cakesRepository().getCakes())
            .returns(Promise.resolve(expectedCakes));

        const manager = new CakesManager(db.object());

        //act
        const cakes = await manager.getCakes();

        //assert
        expect(cakes).toEqual(expectedCakes);
    });

    it("should get cake by id", async () => {

        //arrange
        const expectedCakes = getTestCakes();

        const db = new Mock<IDb>()
            .setup(instance => instance.cakesRepository().getCake(It.IsAny()))
            .returns(Promise.resolve(expectedCakes[0]));

        const manager = new CakesManager(db.object());

        //act
        const cake = await manager.getCake(expectedCakes[0].id || 0);

        //assert
        expect(cake).toEqual(expectedCakes[0]);
    });

    it("should get cakes without using moq", async () => {

        //arrange
        const expectedCakes = getTestCakes();

        const dbConnectionManager = { getKnex: () => undefined };

        const repository = new CakesRepository(dbConnectionManager);

        repository.getCakes = jest.fn(() => Promise.resolve(expectedCakes));

        const db: IDb = {
            dbConnectionManager,
            cakesRepository: () => repository
        }

        const manager = new CakesManager(db);

        //act
        const cakes = await manager.getCakes();

        //assert
        expect(cakes).toEqual(expectedCakes);
    });
});