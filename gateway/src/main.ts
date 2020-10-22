import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { setGlobalOptions } from "@typegoose/typegoose";
import * as helmet from "helmet";

import { AppModule } from "./app.module";

import bodyParser = require("body-parser");

// import { TokenExpiredExceptionListener } from "./core/auth/exceptions/listeners/token-expired-exception.listener";
// import { GlobalErrorExceptionListener } from "./shared/exceptions/listeners/global-error-exception.listener";
// import { TokensManager } from "./core/auth";
// import { KibanaLogger } from "./shared/logger";

const setupGlobalFilters = (app: INestApplication): void => {
  //   const { httpAdapter } = app.get(HttpAdapterHost);
  //   const kibanaLogger = app.get<KibanaLogger>(KibanaLogger);
  //   const tokensManager = app.get<TokensManager>(TokensManager);
  app.useGlobalFilters();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.setGlobalPrefix("v1/api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false
    })
  );

  setupGlobalFilters(app);

  await app.listen(8081);
}

setGlobalOptions({ globalOptions: { useNewEnum: true } });

bootstrap();
