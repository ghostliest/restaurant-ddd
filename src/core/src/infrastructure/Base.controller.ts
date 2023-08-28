import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export class BaseController {
  public ok(res: Response, result: any = {}) {
    console.log("[BaseController - ok]: ", result);
    return res.status(HttpStatus.OK).json(result);
  }

  public fail(res: Response, error: Error | string | any) {
    console.log("[BaseController - fail]: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }

  public conflict(res: Response, error: Error | string | any) {
    console.log("[BaseController - conflict]: ", error);
    return res.status(HttpStatus.CONFLICT).json(error);
  }
}
