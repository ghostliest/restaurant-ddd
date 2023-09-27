import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export interface ICreateRestaurantDTO {
  phone: string;
  city: string;
  street: string;
  building: number;
}

export class CreateRestaurantDTO implements ICreateRestaurantDTO {
  @ApiProperty({
    example: "265-914-3590",
    description: "phone number",
  })
  @IsString()
  phone!: string;

  @ApiProperty({
    example: "city",
    description: "city",
  })
  @IsString()
  city!: string;

  @ApiProperty({
    example: "street",
    description: "street",
  })
  @IsString()
  street!: string;

  @ApiProperty({
    example: 5,
    description: "building number",
  })
  @IsNumber()
  building!: number;
}
