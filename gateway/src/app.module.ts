import { Module, MiddlewareConsumer, RequestMethod, CacheModule, CacheInterceptor, Injectable, ExecutionContext } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule, getConnectionToken } from "nestjs-typegoose";
import { ModuleRef, APP_INTERCEPTOR } from "@nestjs/core";
import { CoreModule } from "./core/core.module";
import { DataModule } from "./data/data.module";
import { SharedModule } from "./shared/shared.module";
import { ApiModule } from "./api/api.module";

export let Container: any;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("GATEWAY_MONGODB_URI"),
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    CoreModule,
    DataModule,
    ApiModule,
    SharedModule
  ]
})
export class AppModule {
  constructor(moduleRef: ModuleRef) {
    Container = {
      get: provider => {
        return moduleRef.get(provider, { strict: false });
      }
    };
  }
}
