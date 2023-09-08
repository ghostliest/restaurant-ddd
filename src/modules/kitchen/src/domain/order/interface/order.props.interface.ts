import { EntityID } from "@/core/domain";

export type TOrderStatus = "ACCEPTED" | "COOK" | "COOKED";

export interface TOrderItem<T = EntityID> {
  id: T;
  meal_id: T;
  name: string;
  quantity: number;
}

export interface IOrderProps {
  status: TOrderStatus;
  meals: TOrderItem[];
}
