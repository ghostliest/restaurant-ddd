import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { OrderConfirmErrors } from "./OrderConfirm.error";

export type OrderConfirmResponse = Either<
  OrderConfirmErrors.OrderNotFound | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
