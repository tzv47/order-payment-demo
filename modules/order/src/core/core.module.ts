import { DataModule } from "@app/data/data.module";
import { HttpModule, Module } from "@nestjs/common";
import { ClientManager } from "./client/client.manager";
import { OrderManager } from "./order/order.manager";

const HTTP_CLIENTS = [];

@Module({
  imports: [HttpModule, DataModule],
  providers: [OrderManager, ClientManager],
  exports: [OrderManager, ClientManager]
})
export class CoreModule {}
