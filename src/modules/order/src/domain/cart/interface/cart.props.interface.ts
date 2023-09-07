import { EntityID } from "@/core/domain";
import { MealPrice } from "domain/meal";
import { CartItem } from "..";

export interface ICartProps {
  customerId: EntityID;
  meals: CartItem[];
  amount: number;
}

export interface ICartItem<T = EntityID> {
  mealId: T;
  quantity: number;
  unitPrice: MealPrice;
}
