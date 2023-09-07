import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace AddToCartErrors {
  export class MealNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Meal not found.`,
      });
    }
  }

  export class CartNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Cart not found.`,
      });
    }
  }
}
