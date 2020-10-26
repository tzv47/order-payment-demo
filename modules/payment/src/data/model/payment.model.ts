import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
import { AbstractModel } from "../../shared/abstracts";
import { ObjectId } from "mongodb";

export enum PaymentStatus {
  SUCCESS = "success",
  DECLINED = "declined",
  PENDING = "pending"
}

export class Payment extends AbstractModel {
  @ApiProperty({ type: Date })
  @prop({ required: true, type: Date })
  public paymentDate!: Date;

  @ApiProperty({ type: Number })
  @prop({ required: true, type: Number })
  public amount!: number;

  @ApiProperty({ type: String })
  @prop({ type: String })
  public ref?: string;

  @ApiProperty({ enum: PaymentStatus })
  @prop({ required: true, enum: PaymentStatus })
  public status!: PaymentStatus;
}
