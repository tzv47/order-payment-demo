import { IsString, IsBoolean, IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RolesTypeEnum } from "../../data/models";

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class NewUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({ enum: RolesTypeEnum })
  @IsEnum(RolesTypeEnum)
  public roleType: RolesTypeEnum;
}
