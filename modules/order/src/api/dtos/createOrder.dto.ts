import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString, IsNumber } from "class-validator";

export class CreateOrderDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  public transactionDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public pinNo: string;
}
