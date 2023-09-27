import { UseCase } from "@/core/application";
import { AppError } from "@/core/error";
import { Result, left, right } from "@/core/monads";
import { IRestaurantRepository, Restaurant } from "domain/restaurant";
import {
  CreateRestaurantErrors,
  CreateRestaurantResponse,
  ICreateRestaurantDTO,
} from ".";

export class CreateRestaurantUseCase
  implements UseCase<ICreateRestaurantDTO, Promise<CreateRestaurantResponse>>
{
  constructor(private readonly _restaurantRepo: IRestaurantRepository) {}

  public async execute(dto: ICreateRestaurantDTO): Promise<CreateRestaurantResponse> {
    try {
      const restaurantOrFail = Restaurant.create({
        phone: dto.phone,
        address: {
          building: dto.building,
          city: dto.city,
          street: dto.street,
        },
      });

      if (restaurantOrFail.isFailure) {
        return left(
          new CreateRestaurantErrors.DomainError(restaurantOrFail.errorValue() as any),
        );
      }

      await this._restaurantRepo.save(restaurantOrFail.getValue());
      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
