import { DataModule } from "@app/data/data.module";
import { HttpModule, Module } from "@nestjs/common";
import { OrderManager } from "./order/order.manager";

const HTTP_CLIENTS = [];

@Module({
  imports: [HttpModule, DataModule],
  providers: [OrderManager],
  exports: [OrderManager]
})
export class CoreModule {}
