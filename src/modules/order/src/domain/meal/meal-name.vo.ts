import { ValueObject } from "@/core/domain";
import { Result } from "@/core/monads";

interface IMealName {
  value: string;
}

export class MealName extends ValueObject<IMealName> {
  private static MIN_LENGTH = 5;
  private static MAX_LENGTH = 30;

  get value() {
    return this.props.value;
  }

  private constructor(props: IMealName) {
    super(props);
  }

  private static isValid(name: string): boolean {
    return name.length <= MealName.MAX_LENGTH && name.length >= MealName.MIN_LENGTH;
  }

  public static create(value: string): Result<MealName> {
    return this.isValid(value)
      ? Result.ok<MealName>(new MealName({ value }))
      : Result.fail<MealName>("Name is invalid");
  }
}
