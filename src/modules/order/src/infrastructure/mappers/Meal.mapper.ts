import { EntityID } from "@/core/domain";
import { Mapper } from "@/core/infrastructure";
import { Meal, MealName, MealDescription, MealPrice } from "domain/meal";

interface IMealToDomainProps {
  id: string;
  name: string;
  description: string;
  price: number;
  isDeleted: boolean;
}

interface IMealToPersistence {
  id: string;
  name: string;
  description: string;
  price: number;
  isDeleted: boolean;
}

class MealMapper extends Mapper<Meal, IMealToDomainProps, IMealToPersistence> {
  public toDomain(raw: IMealToDomainProps | null): Meal {
    if (!raw) return null as any;

    const meal = Meal.restore(
      {
        name: MealName.create(raw.name).getValue(),
        description: MealDescription.create(raw.description).getValue(),
        price: MealPrice.create(raw.price).getValue(),
        isDeleted: raw.isDeleted,
      },
      new EntityID(raw.id)
    );

    return meal.getValue();
  }

  public toPersistence(aggregate: Meal): IMealToPersistence {
    return {
      id: aggregate.id.toString(),
      name: aggregate.name.value,
      description: aggregate.description.value,
      price: aggregate.price.value,
      isDeleted: aggregate.isDeleted,
    };
  }
}

export const mealMapper = new MealMapper();
