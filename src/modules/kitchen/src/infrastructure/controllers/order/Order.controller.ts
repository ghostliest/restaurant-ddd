import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { BaseController } from "@/core/infrastructure";
import { KitchenOrderConfirmed } from "@/core/contracts";
import { OrderHandlerUseCase } from "application/usecases/order/orderHandler";

@Controller("order")
export class OrderController extends BaseController {
  constructor(private readonly _orderHandlerUseCase: OrderHandlerUseCase) {
    super();
  }

  @EventPattern(KitchenOrderConfirmed.eventName)
  public async accept(
    @Payload() data: KitchenOrderConfirmed.Request,
    @Ctx() context: RmqContext
  ): Promise<any> {
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);

      console.log(data, context);

      const result = await this._orderHandlerUseCase.execute(data);

      if (result.isLeft()) {
        const error = result.value;
        console.log("error from [order controller accept isLeft]", error);
      } else {
        return;
      }

      return;
    } catch (e) {
      console.log("error from [order controller accept catch]", e);
    }
  }

  public async confirmCooking() {}
}
