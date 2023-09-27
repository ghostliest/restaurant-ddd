import { Repository } from "typeorm";
import { Employee, IEmployeeRepository } from "domain/employee";
import { EmployeeEntity } from "infrastructure/database/typeorm/entity/employee.entity";
import { employeeMapper } from "infrastructure/mappers/Employee.mapper";

export class EmployeeRepository implements IEmployeeRepository {
  constructor(private _db: Repository<EmployeeEntity>) {}

  exists(aggregate: Employee): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async save(employee: Employee): Promise<void> {
    const mappedEntity = employeeMapper.toPersistence(employee);

    await this._db.save(mappedEntity);
  }
}
