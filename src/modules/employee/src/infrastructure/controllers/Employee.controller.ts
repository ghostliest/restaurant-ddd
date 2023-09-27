import { Response } from "express";
import { Body, Controller, Post, Res, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseController } from "@/core/infrastructure";
import {
  CreateEmployeeDTO,
  CreateEmployeeUseCase,
  CreateEmployeeErrors,
} from "application/usecases/employee/command/create";

@ApiTags("Employee Controller")
@Controller("employee")
export class EmployeeController extends BaseController {
  constructor(private readonly _createEmployeeUseCase: CreateEmployeeUseCase) {
    super();
  }

  @ApiOperation({ summary: "Create employee" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success", type: Object })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: "Conflict" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Server Error" })
  @Post("create")
  public async create(
    @Body() dto: CreateEmployeeDTO,
    @Res() res: Response
  ): Promise<any> {
    try {
      const result = await this._createEmployeeUseCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateEmployeeErrors.DomainError:
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
