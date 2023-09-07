import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { CreateOrderErrors } from "./CreateOrder.error";

export type CreateOrderResponse = Either<
  | CreateOrderErrors.CartNotFound
  | CreateOrderErrors.OrderCannotBeCreate
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
