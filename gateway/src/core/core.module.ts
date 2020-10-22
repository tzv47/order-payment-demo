import { DataModule } from "@app/data/data.module";
import { HttpModule, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthManager } from "./auth";
import { JWT_KEY, JWT_TTL } from "./auth/constants";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";

const HTTP_CLIENTS = [];

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: Number(JWT_TTL) }
    }),
    DataModule
  ],
  providers: [AuthManager, ...HTTP_CLIENTS, JwtStrategy],
  exports: [PassportModule, AuthManager, ...HTTP_CLIENTS]
})
export class CoreModule {}
