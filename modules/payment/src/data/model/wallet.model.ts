import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
import { AbstractModel } from "../../shared/abstracts";
import { ObjectId } from "mongodb";

export class Wallet extends AbstractModel {
  @ApiProperty({ type: ObjectId })
  @prop({ required: true, type: ObjectId })
  public clientId!: string;

  @ApiProperty({ type: Date })
  @prop({ required: true, type: String })
  public pinNo!: string;

  @ApiProperty({ type: Number })
  @prop({ required: true, type: Number })
  public balance!: number;
}
