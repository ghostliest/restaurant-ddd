import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace GetAllRestaurantsErrors {
  export class RestaurantsNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Restaurants not found.`,
      });
    }
  }
}
