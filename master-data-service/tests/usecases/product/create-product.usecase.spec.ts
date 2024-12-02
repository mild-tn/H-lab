import { BadRequestException } from '@nestjs/common';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';
import { ProductDescriptionRepository } from 'src/infrastructure/repositories/product-description.repository';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { Product } from 'src/infrastructure/entities/product.entity';
import { Category } from 'src/infrastructure/entities/category.entity';
import { ProductDescription } from 'src/infrastructure/entities/product-description.entity';
import { CreateProductUseCases } from 'src/usecases/product/create-product.usecase';
import { LoggerService } from 'src/infrastructure/services/logger/logger.service';
import { CreateProductDto } from 'infrastructure/controllers/product/product.dto';

describe('CreateProductUseCases', () => {
  let createProductUseCases: CreateProductUseCases;
  let productRepository: ProductRepository;
  let productDescriptionRepository: ProductDescriptionRepository;
  let categoryRepository: CategoryRepository;
  let logger: LoggerService;
  beforeEach(() => {
    productRepository = {
      createProduct: jest.fn(),
      findOne: jest.fn(),
    } as unknown as ProductRepository;
    categoryRepository = {
      findCategory: jest.fn(),
    } as unknown as CategoryRepository;
    productDescriptionRepository = {
      save: jest.fn(),
    } as unknown as ProductDescriptionRepository;
    logger = {
      log: jest.fn(),
    } as unknown as LoggerService;

    createProductUseCases = new CreateProductUseCases(
      logger,
      productRepository,
      productDescriptionRepository,
      categoryRepository,
    );
  });

  it('should throw BadRequestException if category is not found', async () => {
    const product: CreateProductDto = {
      categoryId: 1,
      sku: 'test-sku',
      price: 100,
      descriptions: [],
      id: 0,
      name: '',
    };

    await expect(createProductUseCases.execute(product)).rejects.toThrow(
      new BadRequestException(
        `Category not found categoryId = ${product.categoryId}`,
      ),
    );
  });
  it('should throw BadRequestException if product with SKU already exists', async () => {
    const product = {
      categoryId: 1,
      sku: 'test-sku',
      price: 100,
      descriptions: [],
    } as CreateProductDto;

    jest.spyOn(categoryRepository, 'findCategory').mockResolvedValue({
      id: 1,
      parentId: '2',
    } as Category);
    jest.spyOn(productRepository, 'findOne').mockResolvedValue({
      sku: 'test-sku',
    } as Product);

    await expect(createProductUseCases.execute(product)).rejects.toThrow(
      new BadRequestException(`Product with SKU ${product.sku} already exists`),
    );
  });

  it('should create product and save descriptions', async () => {
    const category = { id: 1 } as Category;
    const createdProduct = { id: 1 } as Product;
    const productDescriptions = [
      { description: 'desc1', language: 'en' },
      { description: 'desc2', language: 'fr' },
    ] as unknown as ProductDescription;

    jest.spyOn(categoryRepository, 'findCategory').mockResolvedValue(category);
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
    jest
      .spyOn(productRepository, 'createProduct')
      .mockResolvedValue(createdProduct);
    jest
      .spyOn(productDescriptionRepository, 'save')
      .mockResolvedValue(productDescriptions);

    const product = {
      categoryId: 1,
      sku: 'test-sku',
      price: 100,
      descriptions: productDescriptions,
    } as unknown as CreateProductDto;

    await createProductUseCases.execute(product);

    expect(logger.log).toHaveBeenCalledWith(
      CreateProductUseCases.name,
      'New product has been inserted',
    );
  });
});
