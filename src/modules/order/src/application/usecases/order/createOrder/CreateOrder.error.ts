import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace CreateOrderErrors {
  export class OrderCannotBeCreate extends Result<UseCaseError> {
    constructor(error: string) {
      super(false, { message: `Couldn't create order. ${error}` });
    }
  }

  export class CartNotFound extends Result<UseCaseError> {
    constructor(customerId: string) {
      super(false, { message: `Cart not found. CustomerId: ${customerId}` });
    }
  }
}
