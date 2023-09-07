import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export interface IOrderShippingInsideDTO {
  orderId: string;
  restaurantId: string;
  employeeId: string;
}

export class OrderShippingInsideDTO implements IOrderShippingInsideDTO {
  @ApiProperty({
    example: "94082b6c-392d-4c72-a2f6-89e1cfbeadb3",
    description: "Order id",
    nullable: false,
  })
  @IsUUID("4")
  orderId!: string;

  @ApiProperty({
    example: "94082b6c-392d-4c72-a2f6-89e1cfbeadb3",
    description: "Restaurant id",
    nullable: false,
  })
  @IsUUID("4")
  restaurantId!: string;

  @ApiProperty({
    example: "94082b6c-392d-4c72-a2f6-89e1cfbeadb3",
    description: "Employee id",
    nullable: false,
  })
  @IsUUID("4")
  employeeId!: string;
}
