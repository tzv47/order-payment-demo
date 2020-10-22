import { Module } from "@nestjs/common";
import { OrderController } from "./controllers";

@Module({
  imports: [],
  controllers: [OrderController]
})
export class ApiModule {}
