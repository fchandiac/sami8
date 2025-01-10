//id
//commerceId
//name
//description
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';


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
}