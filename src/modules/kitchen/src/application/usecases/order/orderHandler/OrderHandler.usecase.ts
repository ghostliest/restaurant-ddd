import { UseCase } from "@/core/application";
import { KitchenOrderConfirmed } from "@/core/contracts";
import { EntityID } from "@/core/domain";
import { Result, left, right } from "@/core/monads";
import { AppError } from "@/core/error";
import { IOrderRepository, Order, TOrderItem } from "domain/order";
import { OrderHandlerResponse } from "./OrderHandler.response";

export class OrderHandlerUseCase
  implements UseCase<KitchenOrderConfirmed.Request, Promise<OrderHandlerResponse>>
{
  constructor(private readonly _orderRepo: IOrderRepository) {}

  public async execute(
    order: KitchenOrderConfirmed.Request
  ): Promise<OrderHandlerResponse> {
    try {
      const entityOrderId = new EntityID(order.orderId);

      const orderItems: TOrderItem[] = order.items.map((i) => ({
        id: new EntityID(i.id),
        meal_id: new EntityID(i.meal_id),
        name: i.name,
        quantity: i.quantity,
      }));

      const orderOrFail = Order.create(orderItems, entityOrderId);

      // if (orderOrFail.isFailure) {
      //   return left(new OrderHandlerErrors);
      // }

      await this._orderRepo.save(orderOrFail.getValue());

      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
