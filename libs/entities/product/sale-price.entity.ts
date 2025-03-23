import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class SalePrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  netPrice: number;

  @Column()
  tax: number;

  @Column('json', { nullable: true })
  taxes: { id: string; name: string; percentage: number }[];

  @Column()
  grossPrice: number;

  @ManyToOne(() => Product, (product) => product.salePrices)
  product: Product;

  @Column('uuid')
  priceListId: number;

  @Column('uuid')
  commerceId: string;
}
