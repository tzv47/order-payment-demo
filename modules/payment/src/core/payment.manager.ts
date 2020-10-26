import { BadRequestException, HttpService, Injectable, UnauthorizedException } from "@nestjs/common";
import { MakePaymentDto } from "../api/dtos/make-payment.dto";
import { Payment, PaymentStatus, Wallet } from "../data/model";
import { PaymentRepository, WalletRepository } from "../data/repositories";
import { WalletManager } from "./wallet.manager";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { PinNoUtils } from "./security";

@Injectable()
export class PaymentManager {
  constructor(private paymentRepository: PaymentRepository, private walletRepository: WalletRepository, private readonly httpService: HttpService) {}

  public async createPayment(makePaymentDto: MakePaymentDto): Promise<Payment> {
    const { pinNo, clientId, amount } = makePaymentDto;

    const wallet = await this.validateWallet(clientId, pinNo, amount);
    if (!wallet) {
      return;
    }

    const payment = await this.paymentRepository.create(
      plainToClass(Payment, {
        paymentDate: new Date().toISOString(),
        amount,
        ref: wallet._id,
        status: PaymentStatus.PENDING
      })
    );
    return payment;
  }

  public async pay(payment: Payment): Promise<Payment> {
    const paymentStatus = await this.mockPaymentGateway(payment.ref, payment.amount);
    const updatedPayment = await this.paymentRepository.updatePaymentStatus(
      payment._id,
      paymentStatus ? PaymentStatus.SUCCESS : PaymentStatus.DECLINED
    );

    if (paymentStatus) {
      this.walletRepository.updateWalletBalance(payment.ref, payment.amount);
    }

    return updatedPayment;
  }

  private async mockPaymentGateway(walletId: string, amount: number): Promise<any> {
    const endpoint = `https://www.google.com/`;

    return this.httpService
      .get(endpoint)
      .pipe(map(response => Math.random() >= 0.5))
      .toPromise()
      .catch(err => console.error(err));
  }

  private async validateWallet(clientId: string, pinNo: string, payAmount: number): Promise<Wallet> {
    const wallet = await this.walletRepository.getWalletByClient(clientId);

    if (!wallet) {
      throw new UnauthorizedException();
      return null;
    }

    if (!PinNoUtils.check(pinNo, wallet.pinNo)) {
      throw new UnauthorizedException();
    }

    if (payAmount > wallet.balance) {
      throw new BadRequestException("Insufficient Wallet");
    }

    return wallet || null;
  }
}
