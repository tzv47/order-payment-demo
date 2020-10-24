import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
import { AbstractModel } from "../../shared/abstracts";
import { ObjectId } from "mongodb";

export enum OrderStatus {
  CREATED = "created",
  CONFIRMED = "confirmed",
  DELIVERED = "delivered",
  CANCELLED = "canceled"
}

export class Order extends AbstractModel {
  @ApiProperty({ type: Date })
  @prop({ required: true, type: Date })
  public transactionDate!: Date;

  @ApiProperty({ type: Number })
  @prop({ required: true, type: Number })
  public amount!: number;

  @ApiProperty({ type: ObjectId })
  @prop({ required: true, type: ObjectId })
  public clientId!: string;

  @ApiProperty({ enum: OrderStatus })
  @prop({ required: true, enum: OrderStatus, default: OrderStatus.CREATED })
  public status!: OrderStatus;
}
