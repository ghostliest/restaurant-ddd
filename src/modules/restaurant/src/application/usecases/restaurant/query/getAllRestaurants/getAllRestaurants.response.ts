import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { GetAllRestaurantsErrors } from "./getAllRestaurants.error";

export type GetAllRestaurantsResponse = Either<
  GetAllRestaurantsErrors.RestaurantsNotFound | AppError.UnexpectedError,
  Result<void>
>;
