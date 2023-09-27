import { UseCase } from "@/core/application";
import { AppError } from "@/core/error";
import { Result, left, right } from "@/core/monads";
import { IRestaurantRepository } from "domain/restaurant";
import {
  IGetAllRestaurantsDTO,
  GetAllRestaurantsResponse,
  GetAllRestaurantsErrors,
} from ".";

export class GetAllRestaurantsUseCase
  implements UseCase<IGetAllRestaurantsDTO, Promise<GetAllRestaurantsResponse>>
{
  constructor(private readonly _restaurantRepo: IRestaurantRepository) {}

  public async execute(dto: IGetAllRestaurantsDTO): Promise<GetAllRestaurantsResponse> {
    try {
      const restaurantsOrFail = await this._restaurantRepo.getAll(dto);

      if (restaurantsOrFail.hasNoValue) {
        return left(new GetAllRestaurantsErrors.RestaurantsNotFound());
      }

      return right(Result.ok<any>(restaurantsOrFail.value));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
