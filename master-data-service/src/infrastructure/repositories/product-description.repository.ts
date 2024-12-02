import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ProductDescription } from '../entities/product-description.entity';

@Injectable()
export class ProductDescriptionRepository extends Repository<ProductDescription> {
  private readonly repository: Repository<ProductDescription>;

  constructor(private readonly dataSource: DataSource) {
    super(ProductDescription, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(ProductDescription);
  }

  async createProductDescription(
    productDescription: ProductDescription,
  ): Promise<ProductDescription> {
    return await this.repository.save(productDescription);
  }
}
