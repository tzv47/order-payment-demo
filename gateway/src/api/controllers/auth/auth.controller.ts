import { Controller, Post, Request, Body, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthManager, UserToken } from "../../../core/auth";

import { LoginUserDto, NewUserDto } from "../../dtos/user.dto";
import { UserRepository } from "../../../data/repositories/user.repository";
import { RolesGuard } from "../../../core/auth/guards/role.guard";
import { HasRole } from "../../../core/security";
import { RolesTypeEnum } from "../../../data/models";
import { type } from "os";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private auth: AuthManager, private userRepository: UserRepository) {}

  @ApiOperation({ summary: "Login as a user" })
  @ApiResponse({ status: 200 })
  @Post("login")
  public async login(@Body() body: LoginUserDto): Promise<UserToken> {
    return this.auth.login(body);
  }

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  @ApiResponse({ status: 200 })
  public async createUser(@Body() body: NewUserDto): Promise<String> {
    const user = await this.auth.createUser(body);
    return `User ${user.email} has been created`;
  }

  @Get("")
  @ApiOperation({ summary: "Get all user" })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @HasRole(RolesTypeEnum.ADMIN)
  public async getAllUser() {
    return this.userRepository.all();
  }

  @Get("whoami")
  @ApiOperation({ summary: "Get logged user" })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard("jwt"))
  public async testAuth(@Request() req: any): Promise<string> {
    return req.user.email;
  }
}
