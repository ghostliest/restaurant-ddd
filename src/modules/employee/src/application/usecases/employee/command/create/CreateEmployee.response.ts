import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";
import { CreateEmployeeErrors } from ".";

export type CreateEmployeeResponse = Either<
  CreateEmployeeErrors.DomainError | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
