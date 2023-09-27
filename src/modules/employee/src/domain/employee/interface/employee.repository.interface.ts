import { IRepository } from "@/core/infrastructure";
import { Employee } from "..";

export interface IEmployeeRepository extends IRepository<Employee> {}
