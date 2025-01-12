import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Commerce } from './commerce.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  credit: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  allowsInstallments?: boolean;

  @Column({ type: 'int', nullable: true, default: 0 })
  maxInstallments?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  comission?: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  canBeDeleted?: boolean;

  @Column({ type: 'boolean', nullable: true, default: true })
  sell: boolean;

  @Column({ type: 'boolean', nullable: true, default: true })
  purchase: boolean;

  @ManyToOne(() => Commerce, (commerce) => commerce.paymentMethods, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  commerce: Commerce;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
