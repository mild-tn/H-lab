import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { ProductRepository } from './product.repository';
import { Product } from '../entities/product.entity';
import { CategoryRepository } from './category.repository';
import { Category } from '../entities/category.entity';
import { ProductDescription } from '../entities/product-description.entity';
import { ProductDescriptionRepository } from './product-description.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Product, Category, ProductDescription]),
  ],
  providers: [
    ProductRepository,
    CategoryRepository,
    ProductDescriptionRepository,
  ],
  exports: [
    ProductRepository,
    CategoryRepository,
    ProductDescriptionRepository,
  ],
})
export class RepositoriesModule {}
