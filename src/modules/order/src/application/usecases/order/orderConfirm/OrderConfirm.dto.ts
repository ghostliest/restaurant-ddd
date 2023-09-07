import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export interface IOrderConfirmDTO {
  orderId: string;
}

export class OrderConfirmDTO implements IOrderConfirmDTO {
  @ApiProperty({
    example: "94082b6c-392d-4c72-a2f6-89e1cfbeadb3",
    description: "Order id",
    nullable: false,
  })
  @IsUUID("4")
  orderId!: string;
}
