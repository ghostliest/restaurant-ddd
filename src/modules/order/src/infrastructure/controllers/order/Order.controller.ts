import { Body, Controller, Post, Res, HttpStatus, Patch } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { BaseController } from "@/core/infrastructure";
import {
  CreateOrderDTO,
  CreateOrderErrors,
  CreateOrderUseCase,
} from "application/usecases/order/createOrder";
import {
  OrderShippingInsideDTO,
  OrderShippingInsideErrors,
  ShippingInsideUseCase,
} from "application/usecases/order/orderShippingInside";
import {
  OrderConfirmDTO,
  OrderConfirmErrors,
  OrderConfirmUseCase,
} from "application/usecases/order/orderConfirm";

@ApiTags("Order Controller")
@Controller("order")
export class OrderController extends BaseController {
  constructor(
    private readonly _createOrderUseCase: CreateOrderUseCase,
    private readonly _shippingInsideUseCase: ShippingInsideUseCase,
    private readonly _orderConfirmUseCase: OrderConfirmUseCase
  ) {
    super();
  }

  // TODO: get customer from token
  @ApiOperation({ summary: "Create order" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  @Post("create")
  public async create(@Body() dto: CreateOrderDTO, @Res() res: Response): Promise<any> {
    try {
      const result = await this._createOrderUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateOrderErrors.CartNotFound:
          case CreateOrderErrors.OrderCannotBeCreate:
            return this.conflict(res, error.errorValue());
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

  @ApiOperation({ summary: "Set delivery shipping inside" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  @Patch("shipping-inside")
  public async shippingInside(
    @Body() dto: OrderShippingInsideDTO,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this._shippingInsideUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case OrderShippingInsideErrors.OrderNotFound:
            return this.conflict(res, error.errorValue());
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

  @ApiOperation({ summary: "Confirm order" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  @Patch("confirm")
  public async confirm(@Body() dto: OrderConfirmDTO, @Res() res: Response) {
    try {
      const result = await this._orderConfirmUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case OrderConfirmErrors.OrderNotFound:
            return this.conflict(res, error.errorValue());
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
}
