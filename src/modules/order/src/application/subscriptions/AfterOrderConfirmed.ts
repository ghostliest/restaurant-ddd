import { IEventHandle, IDomainEvent } from "@/core/domain/events";
import { ClearCartUseCase } from "application/usecases/cart/command/clearCart";
import { IOrderProps } from "domain/order";

export class AfterOrderConfirmed implements IEventHandle<IOrderProps> {
  private clearCart: ClearCartUseCase;

  constructor(event: IDomainEvent<IOrderProps>, clearCartUseCase: ClearCartUseCase) {
    this.clearCart = clearCartUseCase;
    this.handle(event);
  }

  public async handle(event: IDomainEvent<IOrderProps>): Promise<void> {
    try {
      const result = await this.clearCart.execute(event.aggregate.props.customerId);

      if (result.isLeft()) {
        const error = result.value;
        console.log(
          `[AfterOrderConfirmed - clearCartUseCase - isLeft]`,
          error.errorValue()
        );
      } else {
        console.log(`[AfterOrderConfirmed - clearCartUseCase - OK]`);
      }
    } catch (e) {
      console.log(`[AfterOrderConfirmed - clearCartUseCases - Error]: ${e}`);
    }
  }
}
