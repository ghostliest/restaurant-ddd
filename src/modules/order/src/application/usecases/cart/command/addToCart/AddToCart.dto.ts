import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export interface IAddToCartDTO {
  customerId: string;
  mealId: string;
  quantity: number;
}

export class AddToCartDTO implements IAddToCartDTO {
  @ApiProperty({
    example: "94082b6c-392d-4c72-a2f6-89e1cfbeadb3",
    description: "Customer id",
    nullable: false,
  })
  @IsUUID("4")
  customerId!: string;

  @ApiProperty({
    example: "94082b6c-392d-4c72-a2f6-89e1cfbeadb3",
    description: "Meal id",
    nullable: false,
  })
  @IsUUID("4")
  mealId!: string;

  @ApiProperty({
    example: 1,
    description: "quantity",
    nullable: false,
  })
  @IsNumber()
  quantity!: number;
}
