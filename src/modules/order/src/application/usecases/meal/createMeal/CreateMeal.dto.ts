import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export interface ICreateMealDTO {
  name: string;
  description: string;
  price: number;
}

export class CreateMealDTO implements ICreateMealDTO {
  @ApiProperty({
    example: "Pizza",
    description: "Meal name",
    nullable: false,
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: "Description of the meal",
    description: "Meal description",
    nullable: false,
  })
  @IsString()
  description!: string;

  @ApiProperty({
    example: 100,
    description: "Meal price",
    nullable: false,
  })
  @IsNumber()
  price!: number;
}
