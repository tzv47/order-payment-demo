import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AbstractRepository } from "../../shared/abstracts";
import { Order } from "../models";

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {
  constructor(@InjectModel(Order) protected readonly model: ReturnModelType<typeof Order>) {
    super(model);
  }

  public async findByClient(clientId: string): Promise<Order> {
    return this.model.findOne({ clientId });
  }
}
