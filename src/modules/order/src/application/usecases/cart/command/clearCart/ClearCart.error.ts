import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";
import { EntityID } from "@/core/domain";

export namespace ClearCartErrors {
  export class CartNotFound extends Result<UseCaseError> {
    constructor(customerId: EntityID) {
      super(false, {
        message: `Cart not found. CustomerId - ${customerId.toString()}`,
      });
    }
  }
}
