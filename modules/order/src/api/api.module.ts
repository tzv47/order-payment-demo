import { Module } from "@nestjs/common";
import { DataModule } from "../data/data.module";
import { OrderController } from "./controllers";

@Module({
  imports: [DataModule],
  controllers: [OrderController]
})
export class ApiModule {}
