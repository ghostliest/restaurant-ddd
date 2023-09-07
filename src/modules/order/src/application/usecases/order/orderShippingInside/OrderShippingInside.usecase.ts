import { EntityID } from "@/core/domain";
import { UseCase } from "@/core/application";
import { Result, left, right } from "@/core/monads";
import { AppError } from "@/core/error";
import { IOrderRepository } from "domain/order";
import { IOrderShippingInsideDTO } from "./OrderShippingInside.dto";
import { OrderShippingInsideResponse } from "./OrderShippingInside.response";
import { OrderShippingInsideErrors } from "./OrderShippingInside.error";

export class ShippingInsideUseCase
  implements UseCase<IOrderShippingInsideDTO, Promise<OrderShippingInsideResponse>>
{
  constructor(private readonly _orderRepo: IOrderRepository) {}

  public async execute(
    dto: IOrderShippingInsideDTO
  ): Promise<OrderShippingInsideResponse> {
    try {
      const orderId = new EntityID(dto.orderId);
      const orderOrFail = await this._orderRepo.getByOrderId(orderId);

      if (orderOrFail.hasNoValue) {
        return left(new OrderShippingInsideErrors.OrderNotFound(dto.orderId));
      }

      const order = orderOrFail.value;

      order.setShippingInside(
        new EntityID(dto.restaurantId),
        new EntityID(dto.employeeId)
      );

      await this._orderRepo.save(order);
      return right(Result.ok<void>());
    } catch (e) {
      return left(new AppError.UnexpectedError(e));
    }
  }
}
