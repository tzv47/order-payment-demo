import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
