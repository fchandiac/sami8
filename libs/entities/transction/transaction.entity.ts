import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from 'typeorm';


  export default class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    commerceId: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    categoryId: string;
  
    @Column({ type: 'float', nullable: false })
    purchasePrice: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date | null;
  }