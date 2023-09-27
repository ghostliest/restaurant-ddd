import { Module } from "@nestjs/common";
import { IRestaurantRepository } from "domain/restaurant";
import { CreateRestaurantUseCase } from "application/usecases/restaurant/command/create";
import { GetAllRestaurantsUseCase } from "application/usecases/restaurant/query/getAllRestaurants";
import { GetRestaurantByIdUseCase } from "application/usecases/restaurant/query/getRestaurantById";
import { RestaurantRepository } from "infrastructure/repository/restaurant.repository";
import { restaurantModel } from "infrastructure/database/mongo/schema";
import { RestaurantController } from "infrastructure/controllers/restaurant.controller";

export const RESTAURANT_REPO_DI_TOKEN = Symbol("RESTAURANT_REPO_DI_TOKEN");

@Module({
  controllers: [RestaurantController],
  providers: [
    {
      provide: GetAllRestaurantsUseCase,
      useFactory: (repo: IRestaurantRepository) => new GetAllRestaurantsUseCase(repo),
      inject: [RESTAURANT_REPO_DI_TOKEN],
    },
    {
      provide: GetRestaurantByIdUseCase,
      useFactory: (repo: IRestaurantRepository) => new GetRestaurantByIdUseCase(repo),
      inject: [RESTAURANT_REPO_DI_TOKEN],
    },
    {
      provide: CreateRestaurantUseCase,
      useFactory: (repo: IRestaurantRepository) => new CreateRestaurantUseCase(repo),
      inject: [RESTAURANT_REPO_DI_TOKEN],
    },
    {
      provide: RESTAURANT_REPO_DI_TOKEN,
      useFactory: () => new RestaurantRepository(restaurantModel),
    },
  ],
})
export class RestaurantModule {}
