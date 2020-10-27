import { DataModule } from "@app/data/data.module";
import { CoreModule } from "@app/core/core.module";
import { Module, HttpModule } from "@nestjs/common";
import { AuthController, OrderController } from "./controllers";
import { PaymentController } from "./controllers/webapp/payment.controller";

const AUTH_CONTROLLERS = [AuthController, OrderController, PaymentController];

@Module({
  imports: [HttpModule, CoreModule, DataModule],
  providers: [],
  controllers: [...AUTH_CONTROLLERS]
})
export class ApiModule {}
