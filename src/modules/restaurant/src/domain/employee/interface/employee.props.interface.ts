export enum EmployeePost {
  WAITER,
}

export interface IEmployeeCreateProps {
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  phone: string;
  post: EmployeePost;
  restaurantId: String;
}

export interface IEmployeeProps extends IEmployeeCreateProps {}
