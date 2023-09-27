import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace GetRestaurantByIdErrors {
  export class RestaurantNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Restaurant not found.`,
      });
    }
  }
}
