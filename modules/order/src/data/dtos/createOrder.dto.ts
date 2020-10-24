import { IsString, IsNotEmpty, IsDateString, IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsDateString()
  @IsNotEmpty()
  public transactionDate: Date;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsString()
  @IsNotEmpty()
  public pinNo: string;
}
