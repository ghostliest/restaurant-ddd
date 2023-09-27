import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsUUID, IsString, IsEnum, IsDate } from "class-validator";
import { EmployeePostEnum } from "domain/employee";

export interface ICreateEmployeeDTO {
  firstname: string;
  lastname: string;
  birthdate: Date;
  email: string;
  phone: string;
  post: EmployeePostEnum;
  restaurantId: string;
}

export class CreateEmployeeDTO implements ICreateEmployeeDTO {
  @ApiProperty({
    example: "Arnoldo",
    description: "firstname",
  })
  @IsString()
  firstname!: string;

  @ApiProperty({
    example: "Baumbach",
    description: "lastname",
  })
  @IsString()
  lastname!: string;

  @ApiProperty({
    description: "birthdate",
  })
  @IsDate()
  @Type(() => Date)
  birthdate!: Date;

  @ApiProperty({
    example: "Marcelo53@gmail.com",
    description: "email",
  })
  @IsString()
  email!: string;

  @ApiProperty({
    example: "265-914-3590",
    description: "phone number",
  })
  @IsString()
  phone!: string;

  @ApiProperty({
    // example: EmployeePostEnum,
    description: "post",
  })
  @IsEnum(EmployeePostEnum)
  post!: EmployeePostEnum;

  @ApiProperty({
    example: "c7ad5db9-d7f2-46ae-be72-e3c9905dd996",
    description: "restaurant id",
  })
  @IsUUID("4")
  restaurantId!: string;
}
