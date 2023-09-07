import { Module } from "@nestjs/common";
import { ICartRepository } from "domain/cart";
import { IMealRepository } from "domain/meal";
import { CartController } from "infrastructure/controllers/cart/Cart.controller";
import { AddToCartUseCase } from "application/usecases/cart/command/addToCart";
import {
  CART_REPO_DI_TOKEN,
  DatabaseModule,
  MEAL_REPO_DI_TOKEN,
} from "./database.module";
import { GetCartItemsUseCase } from "application/usecases/cart/query/getCartItems";

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [
    {
      provide: AddToCartUseCase,
      useFactory: (cartRepo: ICartRepository, mealRepo: IMealRepository) =>
        new AddToCartUseCase(cartRepo, mealRepo),
      inject: [CART_REPO_DI_TOKEN, MEAL_REPO_DI_TOKEN],
    },
    {
      provide: GetCartItemsUseCase,
      useFactory: (cartRepo: ICartRepository) => new GetCartItemsUseCase(cartRepo),
      inject: [CART_REPO_DI_TOKEN],
    },
  ],
})
export class CartModule {}
