import { ValueObject } from "@/core/domain";
import { Result } from "@/core/monads";

interface IMealPrice {
  value: number;
}

export class MealPrice extends ValueObject<IMealPrice> {
  private static MAX_PRICE = 10000;
  private static MIN_PRICE = 100;

  get value() {
    return this.props.value;
  }

  private constructor(props: IMealPrice) {
    super(props);
  }

  private static isValid(price: number): boolean {
    return price >= this.MIN_PRICE && price <= this.MAX_PRICE;
  }

  public static create(value: number): Result<MealPrice> {
    return this.isValid(value)
      ? Result.ok<MealPrice>(new MealPrice({ value }))
      : Result.fail<MealPrice>("Price is invalid");
  }
}
