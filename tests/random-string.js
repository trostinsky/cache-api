const chai = require("chai");
const expect = chai.expect;
const randomString = require("../utils/random-string");
describe("Test Random String Function", () => {
    it("Get string with length > 5", () => {
        for(let i = 0; i < 100; i++) {
            const value = randomString();
            expect(value.length, `Строка меньше 5 символов: ${value}, на шаге: ${i}`).greaterThan(5);
        }
    });
})
