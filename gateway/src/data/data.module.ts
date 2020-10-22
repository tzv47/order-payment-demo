import { HttpModule, Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "./models";
import { UserRepository } from "./repositories/user.repository";

const REPOSITORIES = [UserRepository];

@Module({
  imports: [TypegooseModule.forFeature([User]), HttpModule],
  controllers: [],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES]
})
export class DataModule {}
