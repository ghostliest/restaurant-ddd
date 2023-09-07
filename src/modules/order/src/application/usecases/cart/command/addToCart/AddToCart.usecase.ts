import { EntityID } from "@/core/domain";
import { UseCase } from "@/core/application";
import { Result, left, right } from "@/core/monads";
import { AppError } from "@/core/error";
import { CartItem, ICartRepository } from "domain/cart";
import { IMealRepository } from "domain/meal";
import { IAddToCartDTO } from "./AddToCart.dto";
import { AddToCartResponse } from "./AddToCart.response";
import { AddToCartErrors } from "./AddToCart.error";

export class AddToCartUseCase
  implements UseCase<IAddToCartDTO, Promise<AddToCartResponse>>
{
  constructor(
    private readonly _cartRepo: ICartRepository,
    private readonly _mealRepo: IMealRepository
  ) {}

  public async execute(dto: IAddToCartDTO): Promise<AddToCartResponse> {
    try {
      const mealId = new EntityID(dto.mealId);
      const mealOrNothing = await this._mealRepo.getById(mealId);

      if (mealOrNothing.hasNoValue) {
        return left(new AddToCartErrors.MealNotFound());
      }

      const cartOrNothing = await this._cartRepo.getByCustomerId(
        new EntityID(dto.customerId)
      );

      if (cartOrNothing.hasNoValue) {
        return left(new AddToCartErrors.CartNotFound());
      }

      const meal = mealOrNothing.value;
      const cart = cartOrNothing.value;

      const cartItemOrFail = CartItem.create({
        mealId,
        unitPrice: meal.price,
        quantity: dto.quantity,
      });

      // if (cartItemOrFail.isFailure) {
      //   return left(new AddToCartErrors);
      // }

      cart.addItem(cartItemOrFail.getValue());
      await this._cartRepo.save(cart);
      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
