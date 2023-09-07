import { DomainEvents } from "@/core/domain/events";
import { cartRepository } from "infrastructure/ioc/database.module";
import { ClearCartUseCase } from "./usecases/cart/command/clearCart";
import { AfterOrderConfirmed } from "./subscriptions/AfterOrderConfirmed";

export enum DomainEventsEnum {
  OrderConfirmed = "order_confirmed",
}

export const domainEvents = new DomainEvents();

domainEvents.on(
  DomainEventsEnum.OrderConfirmed,
  (event) => new AfterOrderConfirmed(event, new ClearCartUseCase(cartRepository))
);
