import { InjectRepository } from '@nestjs/typeorm';
import { ILogger } from 'src/domain/logger/logger.interface';
import { ProductRepository } from 'src/infrastructure/repositories/product.repository';

export class GetProductUseCases {
  constructor(
    private readonly logger: ILogger,

    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(productId: number, language: string) {
    let result = null;
    if (!productId) {
      result = await this.productRepository.findAllProducts(language);
    } else {
      result = await this.productRepository.findProductById(
        productId,
        language,
      );
    }

    if (!result) {
      this.logger.log(
        GetProductUseCases.name,
        `Not found product id ${productId}`,
      );
    } else {
      this.logger.log(GetProductUseCases.name, `Found product id ${productId}`);
    }
    return result;
  }
}
