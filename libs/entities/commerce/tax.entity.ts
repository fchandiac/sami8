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
export class Tax {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })

  percentage?: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  canBeDeleted?: boolean;

  @Column({ type: 'boolean', nullable: true, default: true })
  sell: boolean;

  @Column({ type: 'boolean', nullable: true, default: true })
  purchase: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Commerce, (commerce) => commerce.taxes, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  commerce: Commerce;
}
