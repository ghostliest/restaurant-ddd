import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace GetCartItemsErrors {
  export class CartNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Cart not found.`,
      });
    }
  }
}
