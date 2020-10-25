import { DataModule } from "@app/data/data.module";
import { HttpModule, Module } from "@nestjs/common";
import { PaymentManager } from "./payment.manager";
import { WalletManager } from "./wallet.manager";

const HTTP_CLIENTS = [];

@Module({
  imports: [HttpModule, DataModule],
  providers: [PaymentManager, WalletManager],
  exports: [PaymentManager, WalletManager]
})
export class CoreModule {}
