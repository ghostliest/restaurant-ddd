import { EntityID } from "@/core/domain";
import { UseCase } from "@/core/application";
import { AppError } from "@/core/error";
import { Result, left, right } from "@/core/monads";
import { BirthdateVO, Employee, IEmployeeRepository } from "domain/employee";
import { CreateEmployeeErrors, CreateEmployeeResponse, ICreateEmployeeDTO } from ".";

export class CreateEmployeeUseCase
  implements UseCase<ICreateEmployeeDTO, Promise<CreateEmployeeResponse>>
{
  constructor(private readonly _employeeRepo: IEmployeeRepository) {}

  public async execute(dto: ICreateEmployeeDTO): Promise<CreateEmployeeResponse> {
    try {
      const birthdateOrFail = BirthdateVO.create(dto.birthdate);

      const voResults = Result.combine([birthdateOrFail]);

      if (voResults.isFailure) {
        return left(new CreateEmployeeErrors.DomainError(voResults.errorValue()));
      }

      const employeeOrFail = Employee.create({
        firstname: dto.firstname,
        lastname: dto.lastname,
        birthdate: birthdateOrFail.getValue(),
        email: dto.email,
        phone: dto.phone,
        post: dto.post,
        restaurantId: new EntityID(dto.restaurantId),
      });

      if (employeeOrFail.isFailure) {
        return left(
          new CreateEmployeeErrors.DomainError(employeeOrFail.errorValue() as any)
        );
      }

      await this._employeeRepo.save(employeeOrFail.getValue());
      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
