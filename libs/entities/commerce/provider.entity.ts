import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    Index,
  } from 'typeorm';
  import { Commerce } from './commerce.entity';
  
  @Entity()
  export class Provider {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 12, nullable: false })
    rut: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    socialReason?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    email?: string;
  
    @Column({ type: 'varchar', length: 15, nullable: true })
    phone?: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    address?: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;
  
    @ManyToOne(() => Commerce, (commerce) => commerce.customers, { onDelete: 'CASCADE' })
    commerce: Commerce;
  }
  