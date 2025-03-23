import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  purcharseGrossPrice: number;

  @Column('uuid')
  commerceId: string;


  // Relación muchos a uno con Category
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
  salePrices: any;
}
