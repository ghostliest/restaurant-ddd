import { UseCase } from "@/core/application";
import { AppError } from "@/core/error";
import { Result, left, right } from "@/core/monads";
import { IRestaurantRepository } from "domain/restaurant";
import {
  IGetRestaurantByIdDTO,
  GetRestaurantByIdResponse,
  GetRestaurantByIdErrors,
} from ".";

export class GetRestaurantByIdUseCase
  implements UseCase<IGetRestaurantByIdDTO, Promise<GetRestaurantByIdResponse>>
{
  constructor(private readonly _restaurantRepo: IRestaurantRepository) {}

  public async execute(dto: IGetRestaurantByIdDTO): Promise<GetRestaurantByIdResponse> {
    try {
      const restaurantsOrFail = await this._restaurantRepo.getById(dto);

      if (restaurantsOrFail.hasNoValue) {
        return left(new GetRestaurantByIdErrors.RestaurantNotFound());
      }

      return right(Result.ok<any>(restaurantsOrFail.value));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
