import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class MakePaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public clientId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public pinNo: string;
}
