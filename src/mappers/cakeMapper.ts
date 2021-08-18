import CakeDto from "../dto/CakeDto";
import CakeEntity from "../entities/CakeEntity";

export function cakeDtoToEntity(dto: CakeDto): CakeEntity {

    const result: CakeEntity = {
        id: dto.id,
        name: dto.name,
        comment: dto.comment,
        imageUrl: dto.imageUrl,
        yumFactor: dto.yumFactor
    };

    return result;
}

export function cakeEntityToDto(entity: CakeEntity): CakeDto {

    const result: CakeDto = {
        id: entity.id,
        name: entity.name,
        comment: entity.comment,
        imageUrl: entity.imageUrl,
        yumFactor: entity.yumFactor
    };

    return result;
}