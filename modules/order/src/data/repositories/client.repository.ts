import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { AbstractRepository } from "../../shared/abstracts";
import { Client } from "../models";

@Injectable()
export class ClientRepository extends AbstractRepository<Client> {
  constructor(@InjectModel(Client) protected readonly model: ReturnModelType<typeof Client>) {
    super(model);
  }
}
