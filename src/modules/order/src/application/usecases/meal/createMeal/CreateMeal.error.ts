import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace CreateMealErrors {
  export class MealCannotBeCreate extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Couldn't create meal.`,
      });
    }
  }

  export class MealAlreadyExists extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Meal already exists.`,
      });
    }
  }
}
