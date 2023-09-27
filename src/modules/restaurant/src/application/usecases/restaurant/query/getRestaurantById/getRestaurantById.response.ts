import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { GetRestaurantByIdErrors } from ".";

export type GetRestaurantByIdResponse = Either<
  GetRestaurantByIdErrors.RestaurantNotFound | AppError.UnexpectedError,
  Result<void>
>;
