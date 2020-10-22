import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JWT_KEY } from "../constants";
import { AuthManager, UserToken } from "../auth.manager";
import { UserRepository } from "../../../data/repositories/user.repository";
import { User } from "../../../data/models";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_KEY
    });
  }

  async validate(payload: { user: string }): Promise<User> {
    const user = await this.authService.findByEmail(payload.user);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
