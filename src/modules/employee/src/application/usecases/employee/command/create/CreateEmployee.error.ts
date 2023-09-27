import { Result } from "@/core/monads";
import { UseCaseError } from "@/core/error";

export namespace CreateEmployeeErrors {
  export class DomainError extends Result<UseCaseError> {
    constructor(error: string) {
      super(false, { message: `Couldn't create employee. ${error}` });
    }
  }
}
