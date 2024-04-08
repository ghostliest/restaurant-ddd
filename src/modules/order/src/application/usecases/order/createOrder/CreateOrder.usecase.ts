import { UseCase } from "@/core/application";
import { EntityID } from "@/core/domain";
import { AppError } from "@/core/error";
import { Result, left, right } from "@/core/monads";
import { ICartRepository } from "domain/cart";
import { IOrderRepository, Order, OrderItem } from "domain/order";
import { MealPrice } from "domain/meal";
import { CreateOrderErrors, CreateOrderResponse, ICreateOrderDTO } from ".";

export class CreateOrderUseCase
  implements UseCase<ICreateOrderDTO, Promise<CreateOrderResponse>>
{
  constructor(
    private readonly _orderRepo: IOrderRepository,
    private readonly _cartRepo: ICartRepository
  ) {}

  public async execute(dto: ICreateOrderDTO): Promise<CreateOrderResponse> {
    try {
      const entityCustomerId = new EntityID(dto.customerId);
      const cartOrFail = await this._cartRepo.getByCustomerId(entityCustomerId);

      if (cartOrFail.hasNoValue) {
        return left(new CreateOrderErrors.CartNotFound(dto.customerId));
      }

      const cart = cartOrFail.value;

      const orderOrFail = Order.create({
        customerId: entityCustomerId,
        amount: cart.props.amount,
        meals: cart.meals.map((i) =>
          OrderItem.create({
            mealId: new EntityID(i.mealId),
            quantity: i.quantity,
            unitPrice: MealPrice.create(i.price).getValue(),
          }).getValue()
        ),
      });

      if (orderOrFail.isFailure) {
        return left(
          new CreateOrderErrors.OrderCannotBeCreate(orderOrFail.errorValue() as any)
        );
      }

      await this._orderRepo.save(orderOrFail.getValue());
      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
