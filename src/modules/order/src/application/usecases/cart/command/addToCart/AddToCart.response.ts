import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { AddToCartErrors } from "./AddToCart.error";

export type AddToCartResponse = Either<
  | AddToCartErrors.CartNotFound
  | AddToCartErrors.MealNotFound
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
