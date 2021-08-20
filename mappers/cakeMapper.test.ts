import CakeDto from "../dto/CakeDto";
import CakeEntity from "../entities/CakeEntity";
import { cakeDtoToEntity, cakeEntityToDto } from "./cakeMapper";

describe("cakeMapper", () => {
    it("should convert dto to entity ", () => {


        const dto: CakeDto = {
            id: 1,
            name: "a cake",
            comment: "a comment",
            imageUrl: "http://an/image.jpg",
            yumFactor: 2
        }

        const entity = cakeDtoToEntity(dto);

        expect(entity.id).toEqual(dto.id);
        expect(entity.name).toEqual(dto.name);
        expect(entity.comment).toEqual(dto.comment);
        expect(entity.imageUrl).toEqual(dto.imageUrl);
        expect(entity.yumFactor).toEqual(dto.yumFactor);
    });

    it("should convert entity to dto ", () => {


        const entity: CakeEntity = {
            id: 1,
            name: "a cake",
            comment: "a comment",
            imageUrl: "http://an/image.jpg",
            yumFactor: 2
        }

        const dto = cakeEntityToDto(entity);

        expect(dto.id).toEqual(entity.id);
        expect(dto.name).toEqual(entity.name);
        expect(dto.comment).toEqual(entity.comment);
        expect(dto.imageUrl).toEqual(entity.imageUrl);
        expect(dto.yumFactor).toEqual(entity.yumFactor);
    });
});