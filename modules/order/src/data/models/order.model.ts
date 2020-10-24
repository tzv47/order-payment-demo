import { prop } from "@typegoose/typegoose";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { isValidObjectId } from "mongoose";
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

  @IsMongoId()
  @prop({ type: isValidObjectId })
  @Transform(value => value.toString(), { toPlainOnly: true })
  public clientId: string;

  @IsEnum(OrderStatus)
  public status: string;
}
