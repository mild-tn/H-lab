import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../env-config/env-config.service';
import { EnvironmentConfigModule } from '../env-config/env-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService): TypeOrmModuleOptions => {
        return {
          type: 'postgres',
          host: config.getDatabaseHost(),
          port: config.getDatabasePort(),
          username: config.getDatabaseUser(),
          password: config.getDatabasePassword(),
          database: config.getDatabaseName(),
          entities: [__dirname + './../../**/*.entity{.ts,.js}'],
          synchronize: true,
          schema: process.env.DATABASE_SCHEMA,
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
