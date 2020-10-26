import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { MakePaymentDto } from "../data/dtos/make-payment.dto";
import { Payment, Wallet } from "../data/model";
import { WalletRepository } from "../data/repositories";
import { PinNoUtils } from "./security";

@Injectable()
export class WalletManager {
  constructor(private walletRepository: WalletRepository) {}
}
