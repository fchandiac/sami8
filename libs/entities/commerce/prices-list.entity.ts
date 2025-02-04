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
  export class PricesList {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;
    
  
    @Column({ type: 'boolean', nullable: true, default: true })
    canBeDeleted?: boolean;

    @Column({ type: 'boolean', nullable: true, default: true })
    sell: boolean;

    @Column({ type: 'boolean', nullable: true, default: false })
    favorite: boolean;
  
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;
  
    @ManyToOne(() => Commerce, (commerce) => commerce.pricesLists, {
      onDelete: 'SET NULL',
      nullable: true,
    })
    commerce: Commerce;
  }