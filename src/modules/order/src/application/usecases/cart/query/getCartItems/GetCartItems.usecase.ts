import { UseCase } from "@/core/application";
import { AppError } from "@/core/error";
import { Result, left, right } from "@/core/monads";
import { ICartRepository } from "domain/cart";
import { IGetCartItemsDTO } from "./GetCartItems.dto";
import { GetCartItemsResponse } from "./GetCartItems.response";
import { GetCartItemsErrors } from "./GetCartItems.error";

export class GetCartItemsUseCase
  implements UseCase<IGetCartItemsDTO, Promise<GetCartItemsResponse>>
{
  constructor(private readonly _cartRepo: ICartRepository) {}

  public async execute(dto: IGetCartItemsDTO): Promise<GetCartItemsResponse> {
    try {
      const itemsOrFail = await this._cartRepo.getItemsByCustomerId(dto);

      if (itemsOrFail.hasNoValue) {
        return left(new GetCartItemsErrors.CartNotFound());
      }

      return right(Result.ok<any>(itemsOrFail.value));
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
