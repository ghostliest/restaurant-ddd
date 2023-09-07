import { Module } from "@nestjs/common";
import { IOrderRepository } from "domain/order";
import { ICartRepository } from "domain/cart";
import { OrderController } from "infrastructure/controllers/order/Order.controller";
import { CreateOrderUseCase } from "application/usecases/order/createOrder";
import { ShippingInsideUseCase } from "application/usecases/order/orderShippingInside";
import { OrderConfirmUseCase } from "application/usecases/order/orderConfirm";
import {
  DatabaseModule,
  CART_REPO_DI_TOKEN,
  ORDER_REPO_DI_TOKEN,
} from "./database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    {
      provide: CreateOrderUseCase,
      useFactory: (orderRepo: IOrderRepository, cartRepo: ICartRepository) =>
        new CreateOrderUseCase(orderRepo, cartRepo),
      inject: [ORDER_REPO_DI_TOKEN, CART_REPO_DI_TOKEN],
    },
    {
      provide: ShippingInsideUseCase,
      useFactory: (orderRepo: IOrderRepository) => new ShippingInsideUseCase(orderRepo),
      inject: [ORDER_REPO_DI_TOKEN],
    },
    {
      provide: OrderConfirmUseCase,
      useFactory: (orderRepo: IOrderRepository) => new OrderConfirmUseCase(orderRepo),
      inject: [ORDER_REPO_DI_TOKEN],
    },
  ],
})
export class OrderModule {}
