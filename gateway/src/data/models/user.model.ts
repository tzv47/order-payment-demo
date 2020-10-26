import { IsEmail, IsString, IsBoolean, IsDate, IsOptional, IsObject } from "class-validator";
import * as mhidden from "mongoose-hidden";
import { modelOptions, prop } from "@typegoose/typegoose";
import { plugin } from "mongoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

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
  @IsEmail()
  @prop({ required: true, unique: true, trim: true, index: true })
  public email: string;

  @IsOptional()
  @prop({ required: true })
  public password: string;

  @IsObject()
  @prop()
  public token: Token;

  @prop({ required: true, enum: RolesTypeEnum, default: RolesTypeEnum.CLIENT })
  public roleType!: RolesTypeEnum;
}
