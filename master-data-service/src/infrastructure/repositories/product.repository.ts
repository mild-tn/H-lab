import { DataSource, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  private readonly repository: Repository<Product>;
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(Product);
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.repository.create(productData);
    return this.repository.save(product);
  }

  async updateProduct(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product> {
    await this.repository.update(id, productData);
    return this.repository.findOne({ where: { id } });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findProductById(id: Product['id'], language: string): Promise<Product> {
    const result = await this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('category.categoryDescriptions', 'categoryDescription')
      .leftJoinAndSelect('product.productDescriptions', 'productDescription')
      .where('product.id = :id', { id })
      .andWhere('categoryDescription.language = :language', { language })
      .andWhere('productDescription.language = :language', { language })
      .getOne();

    return result;
  }

  async findAllProducts(language: string): Promise<Product[]> {
    return await this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('category.categoryDescriptions', 'categoryDescription')
      .leftJoinAndSelect('product.productDescriptions', 'productDescription')
      .where('categoryDescription.language = :language', { language })
      .andWhere('productDescription.language = :language', { language })
      .getMany();
  }
}
