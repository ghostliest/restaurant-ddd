import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace CreateRestaurantErrors {
  export class DomainError extends Result<UseCaseError> {
    constructor(error: string) {
      super(false, { message: `Couldn't create restaurant. ${error}` });
    }
  }
}
