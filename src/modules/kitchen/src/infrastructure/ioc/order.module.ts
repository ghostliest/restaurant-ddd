import { Module } from "@nestjs/common";
import { DATABASE, DatabaseModule } from "./database.module";
import { IOrderRepository } from "domain/order";
import { OrderHandlerUseCase } from "application/usecases/order/orderHandler/OrderHandler.usecase";
import { OrderRepository } from "infrastructure/repository/order.repository";
import { OrderController } from "infrastructure/controllers/order/Order.controller";
import { PrismaService } from "infrastructure/database/prisma/prisma";

export const ORDER_REPO = Symbol("ORDER_REPO");

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderHandlerUseCase,
      useFactory: (orderRepo: IOrderRepository) => new OrderHandlerUseCase(orderRepo),
      inject: [ORDER_REPO],
    },
    {
      provide: ORDER_REPO,
      useFactory: (db: PrismaService) => new OrderRepository(db),
      inject: [DATABASE],
    },
  ],
  exports: [],
})
export class OrderModule {}
