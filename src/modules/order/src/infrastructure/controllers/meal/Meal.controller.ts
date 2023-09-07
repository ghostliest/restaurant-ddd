import { Body, Controller, Post, Res, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { BaseController } from "@/core/infrastructure";
import {
  CreateMealDTO,
  CreateMealErrors,
  CreateMealUseCase,
} from "application/usecases/meal/createMeal";

@ApiTags("Meal Controller")
@Controller("meal")
export class MealController extends BaseController {
  constructor(private readonly _createMealUseCase: CreateMealUseCase) {
    super();
  }

  @ApiOperation({ summary: "Create meal" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  @Post("create")
  public async create(@Body() dto: CreateMealDTO, @Res() res: Response): Promise<any> {
    try {
      const result = await this._createMealUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateMealErrors.MealAlreadyExists:
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
