import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  private readonly repository: Repository<Category>;

  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
    this.repository = this.dataSource.getRepository(Category);
  }

  async createCategory(category: Category): Promise<Category> {
    return await this.repository.save(category);
  }

  async findCategory(id: number): Promise<Category> {
    const result = await this.repository.findOne({ where: { id } });
    return result;
  }

  async findAllCategories(): Promise<Category[]> {
    return await this.repository.find();
  }

  async deleteCategory(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async updateCategory(
    id: number,
    category: Partial<Category>,
  ): Promise<Category> {
    await this.repository.update(id, category);
    return this.findCategory(id);
  }
}
