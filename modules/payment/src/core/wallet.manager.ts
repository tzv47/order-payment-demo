import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Subscribe } from "@briohr/nest-broker";
import * as bcrypt from "bcrypt";

import { Wallet } from "../data/model";
import { WalletRepository } from "../data/repositories";

@Injectable()
export class WalletManager {
  constructor(private walletRepository: WalletRepository) {}

  @Subscribe("USER_CREATED")
  public async createWallet({ _id }: { _id: string }): Promise<void> {
    try {
      const newWallet = plainToClass(Wallet, {
        _id,
        clientId: _id,
        pinNo: await bcrypt.hashSync("000000", 6),
        balance: 1000
      });
      await this.walletRepository.create(newWallet);
    } catch (error) {
      Logger.error("BROKER USER_CREATED");
      Logger.error(_id);
      Logger.error(error);
    }
  }
}
