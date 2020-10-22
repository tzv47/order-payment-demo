import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { setGlobalOptions, Severity } from "@typegoose/typegoose";
import bodyParser = require("body-parser");

const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder().setTitle("Leaves Module").setDescription("The leave module API description").setVersion("2.0").build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("documentation", app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
      // whitelist: true
    })
  );

  app.useGlobalFilters();

  await app.listen(8012);
}

setGlobalOptions({
  schemaOptions: { versionKey: false, timestamps: true },
  globalOptions: { useNewEnum: true },
  options: { allowMixed: Severity.ALLOW }
});

bootstrap();
