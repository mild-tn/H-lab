import { ProductDescriptionRepository } from 'src/infrastructure/repositories/product-description.repository';
import { LoggerModule } from './../services/logger/logger.module';
import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/env-config/env-config.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './usecases-proxy';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductUseCases } from 'src/usecases/product/create-product.usecase';
import { LoggerService } from '../services/logger/logger.service';
import { CategoryRepository } from '../repositories/category.repository';
import { GetProductUseCases } from 'src/usecases/product/get-product.usecase';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  static CREATE_PRODUCT_USECASE = 'CREATE_PRODUCT_USECASE';
  static GET_PRODUCT_USECASE = 'GET_PRODUCT_USECASE';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            ProductRepository,
            ProductDescriptionRepository,
            CategoryRepository,
          ],
          provide: UsecasesProxyModule.CREATE_PRODUCT_USECASE,
          useFactory(
            logger: LoggerService,
            productRepo: ProductRepository,
            productDescription: ProductDescriptionRepository,
            category: CategoryRepository,
          ) {
            return new UseCaseProxy(
              new CreateProductUseCases(
                logger,
                productRepo,
                productDescription,
                category,
              ),
            );
          },
        },
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_USECASE,
          useFactory(logger: LoggerService, productRepo: ProductRepository) {
            return new UseCaseProxy(
              new GetProductUseCases(logger, productRepo),
            );
          },
        },
      ],
      exports: [
        UsecasesProxyModule.CREATE_PRODUCT_USECASE,
        UsecasesProxyModule.GET_PRODUCT_USECASE,
      ],
    };
  }
}
