import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { CategoryDescription } from './category-description.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(
    () => CategoryDescription,
    (categoryDescription) => categoryDescription.category,
  )
  categoryDescriptions: CategoryDescription[];
}
