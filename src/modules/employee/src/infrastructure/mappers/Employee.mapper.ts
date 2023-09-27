import { Mapper } from "@/core/infrastructure";
import { Employee } from "domain/employee";
import { EmployeeEntity } from "infrastructure/database/typeorm/entity/employee.entity";

interface IEmployeePersistence extends EmployeeEntity {}

interface IEmployeeToDomainProps {}

class EmployeeMapper extends Mapper<
  Employee,
  IEmployeeToDomainProps,
  IEmployeePersistence
> {
  public toDomain(raw: IEmployeeToDomainProps | null): any {
    if (!raw) return null as any;
  }

  public toPersistence(aggregate: Employee): IEmployeePersistence {
    const { id, props } = aggregate;
    const emp = new EmployeeEntity();
    emp.id = id.toString();
    emp.firstname = props.firstname;
    emp.lastname = props.lastname;
    emp.birthdate = props.birthdate.value;
    emp.email = props.email;
    emp.phone = props.phone;
    emp.is_deleted = props.isDeleted;
    emp.post = props.post;
    emp.restaurant_id = props.restaurantId.toString();

    return emp;
  }
}

export const employeeMapper = new EmployeeMapper();
