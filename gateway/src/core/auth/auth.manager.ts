import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "../../data/dtos/user.dto";
import { User } from "../../data/models";
import { UserRepository } from "../../data/repositories/user.repository";
import { PasswordUtils } from "../security";
import { JWT_TTL } from "./constants";

export interface UserToken {
  user: string;
  expiresIn: string | number;
  accessToken: string;
}

@Injectable()
export class AuthManager {
  constructor(private user: UserRepository, private readonly jwtService: JwtService) {}

  public async login({ email, password }: LoginUserDto): Promise<UserToken> {
    const user = await this.validateUser(email, password);
    const expiresIn = JWT_TTL;
    if (!user) {
      throw new UnauthorizedException();
    }
    const accessToken = this.jwtService.sign({ user: user.email });
    return {
      user: user.email,
      expiresIn,
      accessToken
    };
  }

  private async validateUser(username: string, password: string): Promise<User> {
    const user = await this.user.findByEmail(username);
    if (user && (await PasswordUtils.check(password, user.password))) {
      return user;
    }

    return null;
  }
}
