import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma";
import { OrderRepository } from "infrastructure/repository/order.repository";
import { CartRepository } from "infrastructure/repository/cart.repository";
import { MealRepository } from "infrastructure/repository/meal.repository";

export const prismaService = new PrismaService({
  log: [{ emit: "event", level: "query" }, "info", "warn", "error"],
  errorFormat: "pretty",
});

export const cartRepository = new CartRepository(prismaService);
export const orderRepository = new OrderRepository(prismaService);
export const mealRepository = new MealRepository(prismaService);

export const DATABASE_DI_TOKEN = Symbol("DATABASE_DI_TOKEN");
export const ORDER_REPO_DI_TOKEN = Symbol("ORDER_REPO_DI_TOKEN");
export const CART_REPO_DI_TOKEN = Symbol("CART_REPO_DI_TOKEN");
export const MEAL_REPO_DI_TOKEN = Symbol("MEAL_REPO_DI_TOKEN");

@Module({
  providers: [
    {
      provide: CART_REPO_DI_TOKEN,
      useFactory: () => cartRepository,
    },
    {
      provide: ORDER_REPO_DI_TOKEN,
      useFactory: () => orderRepository,
    },
    {
      provide: MEAL_REPO_DI_TOKEN,
      useFactory: () => mealRepository,
    },
    {
      provide: DATABASE_DI_TOKEN,
      useFactory: () => prismaService,
    },
  ],
  exports: [
    DATABASE_DI_TOKEN,
    ORDER_REPO_DI_TOKEN,
    CART_REPO_DI_TOKEN,
    MEAL_REPO_DI_TOKEN,
  ],
})
export class DatabaseModule {}
