import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace OrderShippingInsideErrors {
  export class OrderNotFound extends Result<UseCaseError> {
    constructor(orderId: string) {
      super(false, { message: `Order not found. OrderId: ${orderId}` });
    }
  }
}
