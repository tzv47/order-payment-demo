import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConnectionToken, TypegooseModule } from "nestjs-typegoose";
import { BROKER_TYPE_RABBIT, NestBrokerModule } from "@briohr/nest-broker";

import { ApiModule } from "./api/api.module";
import { CoreModule } from "./core/core.module";
import { DataModule } from "./data/data.module";
import { SharedModule } from "./shared/shared.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRootAsync({
      connectionName: "orders",
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("ORDERS_MONGODB_URI"),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }),
      inject: [ConfigService]
    }),
    NestBrokerModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get("BROKER_URL"),
        type: BROKER_TYPE_RABBIT,
        service: "order"
      }),
      inject: [ConfigService]
    }),
    ApiModule,
    CoreModule,
    DataModule,
    SharedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
