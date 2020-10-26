import { IsEmail, IsString, IsBoolean, IsDate, IsOptional, IsObject } from "class-validator";
import * as mhidden from "mongoose-hidden";
import { modelOptions, prop } from "@typegoose/typegoose";
import { plugin } from "mongoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ApiProperty } from "@nestjs/swagger";

export enum RolesTypeEnum {
  ADMIN = "admin",
  CLIENT = "client"
}

export class Token {
  @IsString()
  @prop({ required: true })
  public token: string;

  @IsDate()
  @prop({ required: true })
  public expiresAt: Date;
}

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class User extends Base<string> {
  @ApiProperty()
  @IsEmail()
  @prop({ required: true, unique: true, trim: true, index: true })
  public email: string;

  @ApiProperty()
  @IsString()
  @prop({ required: true })
  public password: string;

  @ApiProperty()
  @IsObject()
  @prop()
  public token: Token;

  @ApiProperty()
  @prop({ required: true, enum: RolesTypeEnum, default: RolesTypeEnum.CLIENT })
  public roleType!: RolesTypeEnum;
}
