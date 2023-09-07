import { Body, Controller, Res, HttpStatus, Post, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { BaseController } from "@/core/infrastructure";
import {
  AddToCartDTO,
  AddToCartErrors,
  AddToCartUseCase,
} from "application/usecases/cart/command/addToCart";
import {
  GetCartItemsDTO,
  GetCartItemsUseCase,
  GetCartItemsErrors,
} from "application/usecases/cart/query/getCartItems";

@ApiTags("Cart Controller")
@Controller("cart")
export class CartController extends BaseController {
  constructor(
    private readonly _addToCartUseCase: AddToCartUseCase,
    private readonly _getCartItemsUseCase: GetCartItemsUseCase
  ) {
    super();
  }

  @ApiOperation({ summary: "Add to cart by customer" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  @Post("customer/add")
  public async addToCartByCustomer(
    @Body() dto: AddToCartDTO,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this._addToCartUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case AddToCartErrors.CartNotFound:
          case AddToCartErrors.MealNotFound:
          default:
            return this.fail(res, error.errorValue());
        }
      } else {
        return this.ok(res);
      }
    } catch (e) {
      return this.fail(res, e);
    }
  }

  // @ApiOperation({ summary: "Add to cart by waiter" })
  // @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  // @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  // @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  // @Post("waiter/add")
  // public async addToCartByWaiter(
  //   @Body() dto: AddToCartDTO,
  //   @Res() res: Response
  // ): Promise<any> {
  //   try {
  //     const result = await this._addToCartUseCase.execute(dto);

  //     if (result.isLeft()) {
  //       const error = result.value;
  //       switch (error.constructor) {
  //         case AddToCartErrors.CartNotFound:
  //         case AddToCartErrors.MealNotFound:
  //         default:
  //           return this.fail(res, error.errorValue());
  //       }
  //     } else {
  //       return this.ok(res);
  //     }
  //   } catch (e) {
  //     return this.fail(res, e);
  //   }
  // }

  @Get("customer")
  public async getCartItems(
    @Body() dto: GetCartItemsDTO,
    @Res() res: Response
  ): Promise<any> {
    try {
      const { isLeft, value } = await this._getCartItemsUseCase.execute(dto);

      if (isLeft()) {
        const error = value;
        switch (error.constructor) {
          case GetCartItemsErrors.CartNotFound:
          default:
            return this.fail(res, error.errorValue());
        }
      } else {
        return this.ok(res, value.getValue());
      }
    } catch (e) {
      return this.fail(res, e);
    }
  }
}
