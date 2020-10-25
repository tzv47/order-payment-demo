import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class MakePaymentDto {
  @IsString()
  @IsNotEmpty()
  public clientId: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsString()
  @IsNotEmpty()
  public pinNo: string;
}
