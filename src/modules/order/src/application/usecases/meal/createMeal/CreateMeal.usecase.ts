import { UseCase } from "@/core/application";
import { Result, left, right } from "@/core/monads";
import { AppError } from "@/core/error";
import { Meal, MealName, MealDescription, MealPrice, IMealRepository } from "domain/meal";
import { ICreateMealDTO } from "./CreateMeal.dto";
import { CreateMealErrors } from "./CreateMeal.error";
import { CreateMealResponse } from "./CreateMeal.response";

export class CreateMealUseCase
  implements UseCase<ICreateMealDTO, Promise<CreateMealResponse>>
{
  constructor(private readonly _mealRepo: IMealRepository) {}

  public async execute(dto: ICreateMealDTO): Promise<CreateMealResponse> {
    try {
      const nameOrFail = MealName.create(dto.name);
      const descrOrFail = MealDescription.create(dto.description);
      const priceOrFail = MealPrice.create(dto.price);

      const dtoResult = Result.combine([nameOrFail, descrOrFail, priceOrFail]);

      if (dtoResult.isFailure) {
        return left(new CreateMealErrors.MealCannotBeCreate());
      }

      const mealOrFail = Meal.create({
        name: nameOrFail.getValue(),
        description: descrOrFail.getValue(),
        price: priceOrFail.getValue(),
      });

      if (mealOrFail.isFailure) {
        return left(new CreateMealErrors.MealCannotBeCreate());
      }

      const meal = mealOrFail.getValue();
      const mealIsExists = await this._mealRepo.exists(meal);

      if (mealIsExists) {
        return left(new CreateMealErrors.MealAlreadyExists());
      }

      await this._mealRepo.save(meal);
      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
