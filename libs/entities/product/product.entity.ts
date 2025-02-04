import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  code: string;

  // Relación muchos a uno con Category
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
