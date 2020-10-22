import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { AbstractModel } from "../../shared/abstracts";

export enum OrderStatus {
  CREATED = "created",
  CONFIRMED = "confirmed",
  DELIVERED = "delivered",
  CANCELLED = "canceled"
}

export class Order extends AbstractModel {
  @IsDate()
  public transactionDate?: Date;

  @IsNumber()
  public amount: number;

  @IsString()
  public clientId: string;

  @IsEnum(OrderStatus)
  public status: string;
}
