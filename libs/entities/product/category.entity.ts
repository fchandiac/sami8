import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Family } from './family.entity';
import { Product } from './product.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commerceId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

    // Relación muchos a uno con Family
  @ManyToOne(() => Family, (family) => family.categories)
  family: Family;

  // Relación uno a muchos con Product
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}