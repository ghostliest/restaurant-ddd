import { MealName } from "..";

describe("Meal name Value Object", () => {
  it("create a valid name", () => {
    const nameOrFail = MealName.create("Die Hard");
    expect(nameOrFail.isSuccess).toBe(true);
  });

  it("should be equal", () => {
    const name = "Die Hard";
    const nameOrFail = MealName.create(name);
    expect(nameOrFail.getValue().value).toBe(name);
  });

  it("should fail to create than maximum length", () => {
    const name = new Array(31).fill("q").join("");
    const nameOrFail = MealName.create(name);
    expect(nameOrFail.isFailure).toBe(true);
  });
});
