import { ValueObject } from "@/core/domain";
import { Result } from "@/core/monads";

interface IMealDescription {
  value: string;
}

export class MealDescription extends ValueObject<IMealDescription> {
  private static MIN_LENGTH = 20;
  private static MAX_LENGTH = 1000;

  get value() {
    return this.props.value;
  }

  private constructor(props: IMealDescription) {
    super(props);
  }

  private static isValid(name: string): boolean {
    return (
      name.length <= MealDescription.MAX_LENGTH &&
      name.length >= MealDescription.MIN_LENGTH
    );
  }

  public static create(value: string): Result<MealDescription> {
    return this.isValid(value)
      ? Result.ok<MealDescription>(new MealDescription({ value }))
      : Result.fail<MealDescription>("Description is invalid");
  }
}
