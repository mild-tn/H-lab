import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class CategoryDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @Column()
  language: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;
}
