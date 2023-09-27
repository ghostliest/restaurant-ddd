import { EntityID } from "@/core/domain";
import { BirthdateVO } from "../birthdate.vo";

export enum EmployeePostEnum {
  WAITER = "WAITER",
  HOSTESS = "HOSTESS",
  CHEF = "CHEF",
  SOUS_CHEF = "SOUS_CHEF",
  COOK = "COOK",
  BARTENDER = "BARTENDER",
}

export interface IEmployeeCreateProps {
  firstname: string;
  lastname: string;
  birthdate: BirthdateVO;
  email: string;
  phone: string;
  post: EmployeePostEnum;
  restaurantId: EntityID;
}

export interface IEmployeeProps extends IEmployeeCreateProps {
  isDeleted: boolean;
}
