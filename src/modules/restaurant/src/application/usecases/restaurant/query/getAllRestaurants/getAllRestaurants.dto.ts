import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export interface IGetAllRestaurantsDTO {
  page: number;
  limit: number;
}

export class GetAllRestaurantsDTO implements IGetAllRestaurantsDTO {
  @ApiProperty({
    example: 1,
    description: "page number",
  })
  @IsNumber()
  page!: number;

  @ApiProperty({
    example: 10,
    description: "limit number",
  })
  @IsNumber()
  limit!: number;
}
