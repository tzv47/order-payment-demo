import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { DataModule } from "../data/data.module";
import { PaymentController } from "./controllers";

@Module({
  imports: [DataModule, CoreModule],
  controllers: [PaymentController]
})
export class ApiModule {}
