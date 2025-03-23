import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { PaymentMethod } from './payment-method.entity';
import { Tax } from './tax.entity';
import { PricesList } from './prices-list.entity';
import { Customer } from './customer.entity';
import { Provider } from './provider.entity';

@Entity()
export class Commerce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  identity: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 12, nullable: false, unique: true })
  rut: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone?: string;

  @Column({ type: 'varchar',  nullable: true })
  logoUrl?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.commerce, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Tax, (tax) => tax.commerce, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  taxes: Tax[];

  @OneToMany(() => PricesList, (pricesList) => pricesList.commerce, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  pricesLists: PricesList[];

  @OneToMany(() => Customer, (customer) => customer.commerce, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  customers: Customer[];

  @OneToMany(() => Provider, (provider) => provider.commerce, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  providers: Provider[];
}
