import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { AbstractModel } from "../../shared/abstracts";

export class Client extends AbstractModel {
  @ApiProperty({ type: String })
  @prop({ type: String })
  public name?: string;

  @ApiProperty({ type: String })
  @prop({ type: String })
  public email: string;

  @ApiProperty({ type: String })
  @prop({ type: String })
  public address?: string;

  @ApiProperty({ type: String })
  @prop({ type: String })
  public phoneNumber?: string;
}
