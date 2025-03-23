import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Family } from './family.entity';
import { Product } from './product.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    commerceId: string;

    @Column()
    name: string;

    @Column({ nullable: true, default: null })
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