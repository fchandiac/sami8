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
import { PricesList } from './pricesList.entity.';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.commerce, { cascade: true })
  paymentMethods: PaymentMethod[];

  @OneToMany(() => Tax, (tax) => tax.commerce, { cascade: true })
  taxes: Tax[];

  @OneToMany(() => PricesList, (pricesList) => pricesList.commerce, { cascade: true })
  pricesLists: PricesList[];
}
