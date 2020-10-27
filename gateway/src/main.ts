import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { setGlobalOptions } from "@typegoose/typegoose";
import * as helmet from "helmet";

import { AppModule } from "./app.module";

import bodyParser = require("body-parser");
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle("Gateway")
    .setDescription("The gateway API description")
    .setVersion("1.0")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "access-token")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("documentation", app, document);
};

const setupGlobalFilters = (app: INestApplication): void => {
  app.useGlobalFilters();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.setGlobalPrefix("v1/api");
  setupSwagger(app);
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
