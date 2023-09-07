import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { OrderShippingInsideErrors } from "./OrderShippingInside.error";

export type OrderShippingInsideResponse = Either<
  OrderShippingInsideErrors.OrderNotFound | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
