import { IsString, IsBoolean, IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsBoolean()
  public rememberMe: boolean = false;
}

export class NewUserDto {
  @IsEmail()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
