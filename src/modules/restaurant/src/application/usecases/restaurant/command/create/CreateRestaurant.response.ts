import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { CreateRestaurantErrors } from ".";

export type CreateRestaurantResponse = Either<
  CreateRestaurantErrors.DomainError | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
