import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { IEmployeeRepository } from "domain/employee";
import { CreateEmployeeUseCase } from "application/usecases/employee/command/create";
import { EmployeeController } from "infrastructure/controllers/Employee.controller";
import { EmployeeEntity } from "infrastructure/database/typeorm/entity/employee.entity";
import { EmployeeRepository } from "infrastructure/repository/Employee.repository";
import { DATABASE_DI_TOKEN, DatabaseModule } from "./database.module";

export const EMPLOYEE_REPO_DI_TOKEN = Symbol("EMPLOYEE_REPO_DI_TOKEN");

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: CreateEmployeeUseCase,
      useFactory: (employeeRepo: IEmployeeRepository) =>
        new CreateEmployeeUseCase(employeeRepo),
      inject: [EMPLOYEE_REPO_DI_TOKEN],
    },
    {
      provide: EMPLOYEE_REPO_DI_TOKEN,
      useFactory: (dataSource: DataSource) =>
        new EmployeeRepository(dataSource.getRepository(EmployeeEntity)),
      inject: [DATABASE_DI_TOKEN],
    },
  ],
})
export class EmployeeModule {}
