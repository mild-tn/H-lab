import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'infrastructure/controllers/product/product.dto';
import { ILogger } from 'src/domain/logger/logger.interface';
import { ProductDescription } from 'src/infrastructure/entities/product-description.entity';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { ProductDescriptionRepository } from 'src/infrastructure/repositories/product-description.repository';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';

export class CreateProductUseCases {
  constructor(
    private readonly logger: ILogger,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    @InjectRepository(ProductDescriptionRepository)
    private readonly productDescriptionRepository: ProductDescriptionRepository,
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async execute(product: CreateProductDto) {
    const category = await this.categoryRepository.findCategory(
      product.categoryId,
    );
    if (!category) {
      throw new BadRequestException(
        `Category not found categoryId = ${product.categoryId}`,
      );
    }
    const existingProduct = await this.productRepository.findOne({
      where: { sku: product.sku },
    });
    if (existingProduct) {
      throw new BadRequestException(
        `Product with SKU ${product.sku} already exists`,
      );
    }

    const createdProduct = await this.productRepository.createProduct({
      category: category,
      sku: product.sku,
      price: product.price,
    });

    const productDescriptions = product.descriptions.map((description) => {
      const productDescription = new ProductDescription();
      productDescription.product = createdProduct;
      productDescription.description = description.description;
      productDescription.language = description.language;
      return productDescription;
    });

    await this.productDescriptionRepository.save(productDescriptions);
    this.logger.log(
      CreateProductUseCases.name,
      'New product has been inserted',
    );
    return { product, productDescriptions };
  }
}
