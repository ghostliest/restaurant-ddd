import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { GetCartItemsErrors } from "./GetCartItems.error";

export type GetCartItemsResponse = Either<
  GetCartItemsErrors.CartNotFound | AppError.UnexpectedError,
  Result<void>
>;
