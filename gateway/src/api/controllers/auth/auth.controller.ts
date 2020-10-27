import { Controller, Post, Request, Body, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthManager, UserToken } from "../../../core/auth";

import { LoginUserDto, NewUserDto } from "../../dtos/user.dto";
import { UserRepository } from "../../../data/repositories/user.repository";
import { RolesGuard } from "../../../core/auth/guards/role.guard";
import { HasRole } from "../../../core/security";
import { RolesTypeEnum } from "../../../data/models";
import { NestBrokerService } from "@briohr/nest-broker";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private auth: AuthManager, private userRepository: UserRepository, private brokerService: NestBrokerService) {}

  @ApiOperation({ summary: "Login as a user" })
  @ApiResponse({ status: 201 })
  @Post("login")
  public async login(@Body() body: LoginUserDto): Promise<UserToken> {
    return this.auth.login(body);
  }

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  @ApiResponse({ status: 200 })
  public async createUser(@Body() body: NewUserDto): Promise<String> {
    const user = await this.auth.createUser(body);
    this.brokerService.publish("USER_CREATED", {
      _id: user._id,
      email: user.email
    });
    return `User ${user.email} has been created`;
  }

  @Get("")
  @ApiOperation({ summary: "Get all user" })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth("access-token")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @HasRole(RolesTypeEnum.ADMIN)
  public async getAllUser() {
    return this.userRepository.all();
  }

  @Get("whoami")
  @ApiOperation({ summary: "Get logged user" })
  @ApiBearerAuth("access-token")
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard("jwt"))
  public async testAuth(@Request() req: any): Promise<string> {
    return req.user.email;
  }
}
