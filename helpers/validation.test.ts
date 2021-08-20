import CakeDto from "../dto/CakeDto";
import { validateRequiredProperty, validateUrl } from "./validation";

const createTestCakeDto = () => {
    const dto: CakeDto = {
        id: 1,
        name: "a cake",
        comment: "a comment",
        imageUrl: "http://an/image.jpg",
        yumFactor: 2
    }

    return dto;
}

describe("validation helper", () => {

    it("should validate object with required property ", () => {

        const dto = createTestCakeDto();

        validateRequiredProperty(dto, "name");
    });

    it("should fail validation of obejct with empty required property ", () => {

        const dto = createTestCakeDto();

        dto.name = "";

        expect(() => {
            validateRequiredProperty(dto, "name");
        }).toThrow();
    });

    it("should fail validation of obejct with missing required property ", () => {

        const dto = {};

        expect(() => {
            validateRequiredProperty(dto, "name");
        }).toThrow();
    });

    it("should validate URLs ", () => {

        const dto = createTestCakeDto();

        validateUrl(dto.imageUrl);

        expect(() => {
            validateUrl("not a URL");
        }).toThrow();
    });
});