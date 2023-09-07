import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export interface IGetCartItemsDTO {
  customerId: string;
  page: number;
  limit: number;
}

export class GetCartItemsDTO implements IGetCartItemsDTO {
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
  // @Type(() => Number)
  @IsNumber()
  // @IsNotEmpty()
  page!: number;

  @ApiProperty({
    example: 1,
    description: "quantity",
    nullable: false,
  })
  @IsNumber()
  limit!: number;
}
