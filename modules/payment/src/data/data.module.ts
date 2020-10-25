import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { Payment, Wallet } from "./model";
import { WalletRepository, PaymentRepository } from "./repositories";

const REPOSITORIES = [PaymentRepository, WalletRepository];

const MODELS = [Payment, Wallet];

@Module({
  imports: [TypegooseModule.forFeature(MODELS, "payments")],
  controllers: [],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES]
})
export class DataModule {}
