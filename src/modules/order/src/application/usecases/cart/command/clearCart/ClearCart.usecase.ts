import { UseCase } from "@/core/application";
import { EntityID } from "@/core/domain";
import { AppError } from "@/core/error";
import { Result, left, right } from "@/core/monads";
import { ICartRepository } from "domain/cart";
import { ClearCartResponse } from "./ClearCart.response";
import { ClearCartErrors } from "./ClearCart.error";

export class ClearCartUseCase implements UseCase<EntityID, Promise<ClearCartResponse>> {
  constructor(private readonly _cartRepo: ICartRepository) {}

  public async execute(customerId: EntityID): Promise<ClearCartResponse> {
    try {
      const cartOrFail = await this._cartRepo.getByCustomerId(customerId);

      if (cartOrFail.hasNoValue) {
        return left(new ClearCartErrors.CartNotFound(customerId));
      }

      const cart = cartOrFail.value;
      cart.clear();

      await this._cartRepo.save(cart);

      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
