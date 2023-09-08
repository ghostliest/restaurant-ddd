import { AggregateRoot, EntityID } from "@/core/domain";
import { Result } from "@/core/monads";
import { IEmployeeCreateProps, IEmployeeProps } from ".";

export class Employee extends AggregateRoot<IEmployeeProps> {
  private constructor(props: IEmployeeProps, id?: EntityID) {
    super(props, id);
  }

  public static restore(props: IEmployeeProps, id: EntityID): Result<Employee> {
    return Result.ok<Employee>(new Employee(props, id));
  }

  public static create(props: IEmployeeCreateProps): Result<Employee> {
    return Result.ok<Employee>(
      new Employee({
        ...props,
      }),
    );
  }
}
