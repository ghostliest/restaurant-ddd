import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export interface IGetRestaurantByIdDTO {
  id: string;
}

export class GetRestaurantByIdDTO implements IGetRestaurantByIdDTO {
  @ApiProperty({
    example: "3aaa4a3a-5ed4-4a23-b5f4-c6ee0c44850b",
    description: "restaurant id",
  })
  @IsUUID("4")
  id!: string;
}
