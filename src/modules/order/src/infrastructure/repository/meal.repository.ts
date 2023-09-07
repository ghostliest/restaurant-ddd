import { EntityID } from "@/core/domain";
import { Maybe } from "@/core/monads";
import { Meal, IMealRepository } from "domain/meal";
import { PrismaService } from "infrastructure/database/prisma/prisma";
import { mealMapper } from "../mappers/Meal.mapper";

export class MealRepository implements IMealRepository {
  constructor(private _db: PrismaService) {}

  public async getById(id: EntityID): Promise<Maybe<Meal>> {
    const res = await this._db.meal.findUnique({
      where: { id: id.toString() },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isDeleted: true,
      },
    });

    return Maybe.just(mealMapper.toDomain(res));
  }

  public async exists(meal: Meal): Promise<boolean> {
    return !!(await this._db.meal.findUnique({
      where: {
        name: meal.name.value,
      },
    }));
  }

  public async save(meal: Meal): Promise<void> {
    const rawMeal = mealMapper.toPersistence(meal);
    await this._db.meal.create({
      data: rawMeal,
    });
  }
}
