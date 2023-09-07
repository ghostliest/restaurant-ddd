import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { CreateMealErrors } from "./CreateMeal.error";

export type CreateMealResponse = Either<
  | CreateMealErrors.MealCannotBeCreate
  | CreateMealErrors.MealAlreadyExists
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
