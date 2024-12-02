import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductDescription } from './product-description.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(
    () => ProductDescription,
    (productDescription) => productDescription.product,
  )
  productDescriptions: ProductDescription[];
}
