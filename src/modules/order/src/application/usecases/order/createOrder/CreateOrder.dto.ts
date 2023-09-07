import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export interface ICreateOrderDTO {
  customerId: string;
}

export class CreateOrderDTO implements ICreateOrderDTO {
  @ApiProperty({
    example: "94082b6c-392d-4c72-a2f6-89e1cfbeadb3",
    description: "Customer id",
    nullable: false,
  })
  @IsUUID("4")
  customerId!: string;
}
