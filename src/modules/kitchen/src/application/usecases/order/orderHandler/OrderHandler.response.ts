import { Either, Result } from "@/core/monads";
import { AppError } from "@/core/error";

export type OrderHandlerResponse = Either<AppError.UnexpectedError, Result<void>>;
