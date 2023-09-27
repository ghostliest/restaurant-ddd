import { IRepository } from "@/core/infrastructure";
import { Maybe } from "@/core/monads";
import { IGetAllRestaurantsDTO } from "application/usecases/restaurant/query/getAllRestaurants";
import { IGetRestaurantByIdDTO } from "application/usecases/restaurant/query/getRestaurantById";
import { IRestaurantMongoSchema, Restaurant } from "..";

export interface IRestaurantRepository extends IRepository<Restaurant> {
  getAll(dto: IGetAllRestaurantsDTO): Promise<Maybe<IRestaurantResponse[]>>;
  getById(dto: IGetRestaurantByIdDTO): Promise<Maybe<IRestaurantResponse>>;
}

export interface IRestaurantResponse extends IRestaurantMongoSchema {}
