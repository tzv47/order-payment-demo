import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { DataModule } from "../data/data.module";
import { OrderController } from "./controllers";

@Module({
  imports: [DataModule, CoreModule],
  controllers: [OrderController]
})
export class ApiModule {}
