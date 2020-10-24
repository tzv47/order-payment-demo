import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { AbstractModel } from "../../shared/abstracts";

export class Client extends AbstractModel {
  @IsString()
  public name?: string;

  @IsString()
  public address?: string;

  @IsString()
  public phoneNumber?: string;

  @IsString()
  public pinNo: string;

  @IsNumber()
  public accountBalance: number;
}
