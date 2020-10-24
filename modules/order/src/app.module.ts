import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
// import { DataModule } from "./data";
// import { ApiModule } from "./api";
import { getConnectionToken, TypegooseModule } from "nestjs-typegoose";
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
    ApiModule,
    CoreModule,
    DataModule,
    SharedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
