import { HttpService, Injectable } from "@nestjs/common";
import { MakePaymentDto } from "../data/dtos/make-payment.dto";
import { Payment, PaymentStatus } from "../data/model";
import { PaymentRepository } from "../data/repositories";
import { WalletManager } from "./wallet.manager";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

@Injectable()
export class PaymentManager {
  constructor(private paymentRepository: PaymentRepository, private walletManager: WalletManager, private readonly httpService: HttpService) {}

  public async pay(makePaymentDto: MakePaymentDto): Promise<Payment> {
    const { pinNo, clientId, amount } = makePaymentDto;

    const wallet = await this.walletManager.validateWallet(clientId, pinNo, amount);
    if (!wallet) {
      return;
    }

    const paymentStatus = await this.mockPaymentGateway(wallet._id, amount);

    const payment = await this.paymentRepository.create(
      plainToClass(Payment, {
        paymentDate: new Date().toISOString(),
        amount,
        ref: wallet._id,
        status: paymentStatus ? PaymentStatus.SUCCESS : PaymentStatus.DECLINED
      })
    );

    return payment;
  }

  private async mockPaymentGateway(walletId: string, amount: number): Promise<any> {
    const endpoint = `https://www.google.com/`;

    return this.httpService
      .get(endpoint)
      .pipe(map(response => Math.random() >= 0.5))
      .toPromise()
      .catch(err => console.error(err));
  }
}
