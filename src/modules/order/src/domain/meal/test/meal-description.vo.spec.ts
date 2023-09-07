import { MealDescription } from "..";

describe("Meal description Value Object", () => {
  it("min length", () => {
    const desc = new Array(20).fill("q").join("");
    const descriptionOrFail = MealDescription.create(desc);
    expect(descriptionOrFail.isSuccess).toBe(true);
  });
  it("max length", () => {
    const desc = new Array(1000).fill("q").join("");
    const descriptionOrFail = MealDescription.create(desc);
    expect(descriptionOrFail.isSuccess).toBe(true);
  });

  it("should be equal", () => {
    const desc = new Array(20).fill("q").join("");
    const descriptionOrFail = MealDescription.create(desc);
    expect(descriptionOrFail.getValue().value).toBe(desc);
  });

  it("more than maximum length", () => {
    const desc = new Array(1001).fill("q").join("");
    const descriptionOrFail = MealDescription.create(desc);
    expect(descriptionOrFail.isFailure).toBe(true);
  });
});
