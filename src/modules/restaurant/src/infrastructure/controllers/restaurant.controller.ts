import { Body, Controller, Post, Res, HttpStatus, Patch, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { BaseController } from "@/core/infrastructure";
import {
  CreateRestaurantDTO,
  CreateRestaurantUseCase,
  CreateRestaurantErrors,
} from "application/usecases/restaurant/command/create";
import {
  GetAllRestaurantsDTO,
  GetAllRestaurantsUseCase,
  GetAllRestaurantsErrors,
} from "application/usecases/restaurant/query/getAllRestaurants";
import {
  GetRestaurantByIdUseCase,
  GetRestaurantByIdDTO,
  GetRestaurantByIdErrors,
} from "application/usecases/restaurant/query/getRestaurantById";

@ApiTags("Restaurant Controller")
@Controller("restaurant")
export class RestaurantController extends BaseController {
  constructor(
    private readonly _createRestaurantUseCase: CreateRestaurantUseCase,
    private readonly _getAllRestaurantsUseCase: GetAllRestaurantsUseCase,
    private readonly _getRestaurantByIdUseCase: GetRestaurantByIdUseCase,
  ) {
    super();
  }

  @ApiOperation({ summary: "Create restaurant" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  @Post("create")
  public async create(
    @Body() dto: CreateRestaurantDTO,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this._createRestaurantUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateRestaurantErrors.DomainError:
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

  @ApiOperation({ summary: "get all restaurants" })
  @Get("get-all")
  public async getAll(
    @Body() dto: GetAllRestaurantsDTO,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this._getAllRestaurantsUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetAllRestaurantsErrors.RestaurantsNotFound:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      } else {
        return this.ok(res, result.value.getValue());
      }
    } catch (e) {
      return this.fail(res, e);
    }
  }

  @ApiOperation({ summary: "get restaurant by id" })
  @Get("get")
  public async getById(
    @Body() dto: GetRestaurantByIdDTO,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const result = await this._getRestaurantByIdUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetRestaurantByIdErrors.RestaurantNotFound:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      } else {
        return this.ok(res, result.value.getValue());
      }
    } catch (e) {
      return this.fail(res, e);
    }
  }
}
