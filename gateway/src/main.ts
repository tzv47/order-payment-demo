import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { setGlobalOptions } from "@typegoose/typegoose";
import * as helmet from "helmet";

import { AppModule } from "./app.module";

import bodyParser = require("body-parser");

const setupGlobalFilters = (app: INestApplication): void => {
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
