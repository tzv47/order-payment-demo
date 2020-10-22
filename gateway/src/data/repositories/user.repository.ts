import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AbstractRepository } from "../../shared/abstracts";
import { Token, User } from "../models";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User) protected readonly model: ReturnModelType<typeof User>) {
    super(model);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ email });
  }

  public async setToken({ userId, token, expiresAt }): Promise<User> {
    const updatedToken: Token = {
      token,
      expiresAt
    };
    return this.model.findOneAndUpdate({ _id: userId }, { token: updatedToken }, { new: true });
  }
}
