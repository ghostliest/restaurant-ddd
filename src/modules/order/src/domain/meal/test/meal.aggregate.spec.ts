import { Meal, MealDescription, MealName, MealPrice } from "..";

const nameMock = new Array(10).fill("q").join("");
const descriptionMock = new Array(20).fill("q").join("");
const priceMock = 100;

describe("Meal aggregate", () => {
  it("should create meal", () => {
    const name = MealName.create(nameMock).getValue();
    const description = MealDescription.create(descriptionMock).getValue();
    const price = MealPrice.create(priceMock).getValue();

    const mealOrFail = Meal.create({
      name,
      description,
      price,
    });

    expect(mealOrFail.isSuccess).toBeTruthy();
  });

  it("change price", () => {
    const name = MealName.create(nameMock).getValue();
    const description = MealDescription.create(descriptionMock).getValue();
    const price = MealPrice.create(priceMock).getValue();

    const meal = Meal.create({
      name,
      description,
      price,
    }).getValue();

    const newPriceValue = 200;
    const newPrice = MealPrice.create(newPriceValue).getValue();
    meal.changePrice(newPrice);

    expect(meal.price.value).toBe(newPriceValue);
  });
});
