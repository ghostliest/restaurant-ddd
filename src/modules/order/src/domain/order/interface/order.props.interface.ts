import { EntityID } from "@/core/domain";
import { MealPrice } from "domain/meal";
import { OrderItem } from "..";

export type TOrderStatus = "OPEN" | "COMPLETED" | "CANCELLED";
export type TOrderType = "DELIVERY" | "INSIDE";

export interface IOrderItem<T = EntityID> {
  mealId: T;
  quantity: number;
  unitPrice: T extends EntityID ? MealPrice : number;
}

export interface IOrderCreateProps {
  customerId: EntityID;
  meals: OrderItem[];
  amount: number;
}

export interface IOrderProps extends IOrderCreateProps {
  status: TOrderStatus;
  isPaid: boolean;
  restaurantId?: EntityID;
  type?: TOrderType;
  employeeId?: EntityID;
  address?: {};
}
