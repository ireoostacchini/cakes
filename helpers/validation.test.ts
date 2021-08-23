import CakeDto from "../dto/CakeDto";
import { validateNumber, validateRequiredProperties, validateUrl } from "./validation";

const createTestCakeDto = () => {
    const dto: CakeDto = {
        id: 1,
        name: "a cake",
        comment: "a comment",
        imageUrl: "http://an/image.jpg",
        yumFactor: 2
    };
    return dto;
};

describe("validation helper", () => {

    it("should validate number", () => {

        const dto = createTestCakeDto();

        validateNumber("yumFactor", "8");
    });

    it("should fail validation for non-number", () => {

        const dto = createTestCakeDto();

        expect(() => {
            validateNumber("yumFactor", "xx");
        }).toThrow();
    });

    it("should validate object with required properties", () => {

        const dto = createTestCakeDto();

        validateRequiredProperties(dto, ["name", "comment"]);
    });

    it("should fail validation of obejct with empty required property ", () => {

        const dto = createTestCakeDto();

        dto.name = "";

        expect(() => {
            validateRequiredProperties(dto, ["name", "comment"]);
        }).toThrow();
    });

    it("should fail validation of obejct with missing required property ", () => {

        const dto = {};

        expect(() => {
            validateRequiredProperties(dto, ["name", "comment"]);
        }).toThrow();
    });

    it("should validate URLs ", () => {

        const dto = createTestCakeDto();

        validateUrl("myProperty", dto.imageUrl);

        expect(() => {
            validateUrl("myProperty", "not a URL");
        }).toThrow();
    });
});
