import { Module } from "@nestjs/common";
import { CreateMealUseCase } from "application/usecases/meal/createMeal";
import { MealController } from "infrastructure/controllers/meal/Meal.controller";
import { IMealRepository } from "domain/meal";
import { DatabaseModule, MEAL_REPO_DI_TOKEN } from "./database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [MealController],
  providers: [
    {
      provide: CreateMealUseCase,
      useFactory: (mealRepo: IMealRepository) => new CreateMealUseCase(mealRepo),
      inject: [MEAL_REPO_DI_TOKEN],
    },
  ],
})
export class MealModule {}
