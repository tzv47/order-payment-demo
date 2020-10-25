import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AbstractRepository } from "../../shared/abstracts";
import { Wallet } from "../model";

@Injectable()
export class WalletRepository extends AbstractRepository<Wallet> {
  constructor(@InjectModel(Wallet) protected readonly model: ReturnModelType<typeof Wallet>) {
    super(model);
  }

  public async getWalletByClient(clientId: string): Promise<Wallet> {
    return this.model.findOne({ clientId });
  }

  public async updateWalletBalance(_id: string, balance: number): Promise<Wallet> {
    return this.model.findOneAndUpdate(
      { _id },
      { $set: { balance } },
      {
        new: true
      }
    );
  }
}
