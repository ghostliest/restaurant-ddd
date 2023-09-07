import { MealDescription, MealName, MealPrice } from "..";

export interface IMealCreateProps {
  name: MealName;
  description: MealDescription;
  price: MealPrice;
}

export interface IMealProps extends IMealCreateProps {
  isDeleted: boolean;
}
