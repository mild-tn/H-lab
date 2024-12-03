import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/domain/logger/logger.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';

export class GetProductUseCases {
  constructor(
    private readonly logger: ILogger,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    productId: number,
    query: { language: string; page: number; pageSize },
  ) {
    if (!productId) {
      this.logger.log(`${GetProductUseCases.name}`, 'find all products');
      const result = await this.productRepository.findAllProducts(query);
      return {
        data: result.products,
        metadata: {
          page: query.page || 1,
          pageSize: query.pageSize || 10,
          total: result.count,
        },
      };
    } else {
      this.logger.log(
        `${GetProductUseCases.name}`,
        `find product detail with id ${productId}`,
      );
      return await this.productRepository.findProductById(
        productId,
        query.language,
      );
    }
  }
}
