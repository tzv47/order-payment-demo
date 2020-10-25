import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { MakePaymentDto } from "../data/dtos/make-payment.dto";
import { Payment, Wallet } from "../data/model";
import { WalletRepository } from "../data/repositories";
import { PinNoUtils } from "./security";

@Injectable()
export class WalletManager {
  constructor(private walletRepository: WalletRepository) {}

  public async validateWallet(clientId: string, pinNo: string, payAmount: number): Promise<Wallet> {
    const wallet = await this.walletRepository.getWalletByClient(clientId);

    if (!wallet) {
      throw new UnauthorizedException();
    }

    if (!PinNoUtils.check(pinNo, wallet.pinNo)) {
      throw new UnauthorizedException();
    }

    if (payAmount > wallet.balance) {
      throw new BadRequestException("Insufficient Wallet");
    }

    return wallet || null;
  }

  public async updateWalletBalance(walletId, balance) {
    return this.updateWalletBalance(walletId, balance);
  }
}
