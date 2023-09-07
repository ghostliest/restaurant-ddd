import { MealPrice } from "..";

describe("MealPrice ValueObject", () => {
  it("min price", () => {
    const priceOrFail = MealPrice.create(100);
    expect(priceOrFail.isSuccess).toBe(true);
  });

  it("max price", () => {
    const priceOrFail = MealPrice.create(10000);
    expect(priceOrFail.isSuccess).toBe(true);
  });

  it("more than maximum price", () => {
    const price = 15000;
    const priceOrFail = MealPrice.create(price);
    expect(priceOrFail.isFailure).toBe(true);
  });
});
