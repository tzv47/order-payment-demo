import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { Client, Order } from "./models";
import { ClientRepository, OrderRepository } from "./repositories";

const REPOSITORIES = [OrderRepository, ClientRepository];

const MODELS = [Order, Client];

@Module({
  imports: [TypegooseModule.forFeature(MODELS, "orders")],
  controllers: [],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES]
})
export class DataModule {}
