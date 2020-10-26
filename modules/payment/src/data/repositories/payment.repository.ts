import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AbstractRepository } from "../../shared/abstracts";
import { Payment, PaymentStatus } from "../model";

@Injectable()
export class PaymentRepository extends AbstractRepository<Payment> {
  constructor(@InjectModel(Payment) protected readonly model: ReturnModelType<typeof Payment>) {
    super(model);
  }

  public async updatePaymentStatus(_id: string, status: PaymentStatus): Promise<Payment> {
    return this.model.findOneAndUpdate(
      { _id },
      { $set: { status } },
      {
        new: true
      }
    );
  }
}
