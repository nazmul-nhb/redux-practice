import { isEven } from "./math";

describe("isEven", () => {
    it("should return true if given an even number", () => {
        // function under test (system under test --> SUT)
        const result = isEven(4);
        expect(result).toEqual(true);
    });

    it("should return true if given an odd number", () => {
        // function under test (system under test --> SUT)
        const result = isEven(5);
        expect(result).toEqual(false);
    });
})