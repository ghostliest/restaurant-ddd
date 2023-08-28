import { Result } from "../monads";
import { UseCaseError } from "./UseCase.error";

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    constructor(error: any) {
      super(false, {
        message: "Unexpected error occurred.",
      } as UseCaseError);

      console.log(`[AppError]:`, error);
    }
  }
}
