import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AbstractRepository } from "../../shared/abstracts";
import { Payment } from "../model";

@Injectable()
export class PaymentRepository extends AbstractRepository<Payment> {
  constructor(@InjectModel(Payment) protected readonly model: ReturnModelType<typeof Payment>) {
    super(model);
  }
}
