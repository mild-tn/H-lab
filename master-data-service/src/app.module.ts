import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecase-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.modules';
import { LoggerModule } from './infrastructure/services/logger/logger.module';
import { EnvironmentConfigModule } from './infrastructure/config/env-config/env-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    ControllersModule,
    UsecasesProxyModule.register(),
    EnvironmentConfigModule,
  ],
})
export class AppModule {}
