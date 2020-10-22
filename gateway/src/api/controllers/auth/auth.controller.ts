import { Controller, Post, Request, Body, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthManager, UserToken } from "../../../core/auth";

import { LoginUserDto } from "../../../data/dtos/user.dto";
import { UserRepository } from "../../../data/repositories/user.repository";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthManager, private userRepository: UserRepository) {}

  @Post("login")
  public async login(@Body() body: LoginUserDto): Promise<UserToken> {
    return this.auth.login(body);
  }

  @Get("")
  @UseGuards(AuthGuard("jwt"))
  public async getAllUser() {
    return this.userRepository.all();
  }

  @Get("whoami")
  @UseGuards(AuthGuard("jwt"))
  public async testAuth(@Request() req: any): Promise<string> {
    return req.user.email;
  }
}
