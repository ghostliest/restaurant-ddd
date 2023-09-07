import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { ClearCartErrors } from "./ClearCart.error";

export type ClearCartResponse = Either<
  ClearCartErrors.CartNotFound | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
