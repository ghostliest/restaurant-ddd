import { EntityID } from "@/core/domain";
import { UseCase } from "@/core/application";
import { Result, left, right } from "@/core/monads";
import { KitchenOrderConfirmed } from "@/core/contracts";
import { AppError } from "@/core/error";
import { integrationEvents } from "application/integrationEvents";
import { IOrderRepository } from "domain/order";
import { IOrderConfirmDTO } from "./OrderConfirm.dto";
import { OrderConfirmErrors } from "./OrderConfirm.error";
import { OrderConfirmResponse } from "./OrderConfirm.response";

export class OrderConfirmUseCase
  implements UseCase<IOrderConfirmDTO, Promise<OrderConfirmResponse>>
{
  constructor(private readonly _orderRepo: IOrderRepository) {}

  public async execute(dto: IOrderConfirmDTO): Promise<OrderConfirmResponse> {
    try {
      const orderId = new EntityID(dto.orderId);
      const orderOrFail = await this._orderRepo.getByOrderId(orderId);

      if (orderOrFail.hasNoValue) {
        return left(new OrderConfirmErrors.OrderNotFound(orderId.toString()));
      }

      const order = orderOrFail.value;
      order.confirm();

      integrationEvents.sendEvent<KitchenOrderConfirmed.Request>(
        KitchenOrderConfirmed.eventName,
        {
          orderId: order.id.toString(),
          items: order.meals.map((i) => ({
            id: i.id.toString(),
            meal_id: i.mealId.toString(),
            name: i.mealId.toString().split("-")[0],
            quantity: i.quantity,
          })),
        }
      );

      await this._orderRepo.save(order);
      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
