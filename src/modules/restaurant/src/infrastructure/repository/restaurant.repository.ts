import { Maybe } from "@/core/monads";
import {
  IRestaurantRepository,
  IRestaurantResponse,
  Restaurant,
} from "domain/restaurant";
import { IGetAllRestaurantsDTO } from "application/usecases/restaurant/query/getAllRestaurants";
import { IGetRestaurantByIdDTO } from "application/usecases/restaurant/query/getRestaurantById";
import { restaurantModel } from "infrastructure/database/mongo/schema";
import { restaurantMapper } from "infrastructure/mappers/restaurant.mapper";

export class RestaurantRepository implements IRestaurantRepository {
  constructor(private readonly _model: typeof restaurantModel) {}

  exists(value: Restaurant): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async getAll(dto: IGetAllRestaurantsDTO): Promise<Maybe<IRestaurantResponse[]>> {
    const res = await this._model
      .find(
        {},
        {
          _id: true,
          address: true,
          isDeleted: true,
          phone: true,
          createdAt: true,
          tables: true,
        },
        {
          limit: dto.limit,
          skip: (dto.page - 1) * dto.limit,
        },
      )
      .exec();

    return Maybe.just(res);
  }

  public async getById(dto: IGetRestaurantByIdDTO): Promise<Maybe<IRestaurantResponse>> {
    const res = await this._model
      .findOne(
        { _id: dto.id },
        {
          _id: true,
          address: true,
          isDeleted: true,
          phone: true,
          createdAt: true,
          tables: true,
        },
      )
      .exec();

    return Maybe.just(res!);
  }

  public async save(restaurant: Restaurant): Promise<void> {
    const model = restaurantMapper.toPersistence(restaurant);
    await model.save();
  }
}
