import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Bind, Param, Query, Patch, Body, Post } from "@nestjs/common";
import { PaymentRepository } from "../../data/repositories";
import { PaymentManager } from "../../core/payment.manager";
import { Payment } from "../../data/model";
import { MakePaymentDto } from "../../data/dtos/make-payment.dto";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(private paymentRepository: PaymentRepository, private paymentManager: PaymentManager) {}

  @Get("")
  public async getAll(): Promise<Array<Payment>> {
    return this.paymentRepository.all({});
  }

  @Post("")
  @Bind(Body())
  @ApiOperation({ summary: "Create one payment transaction" })
  @ApiResponse({ status: 200, type: Payment })
  public async makePayment(makePaymentDto: MakePaymentDto): Promise<Payment> {
    const payment = await this.paymentManager.createPayment(makePaymentDto);
    return this.paymentManager.pay(payment);
  }
}
