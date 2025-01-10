import { Entity, Column, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class Commerce {
  @PrimaryGeneratedColumn('uuid')  // Usamos 'uuid' para que el id sea un UUID
  id: string;

  @Column({ length: 200, nullable: false, unique: true, default: '' })
  name: string;

  @Column({ length: 50, nullable: false, unique: true, default: '' })
  identity: string;

  @Column({ length: 12, nullable: false, unique: true, default: '' })
  rut: string;

  @Column({ length: 400, nullable: false, default: '' })
  address: string;

  @Column({ length: 200, nullable: false, default: '' })
  phone: string;

  @Column({ length: 200, nullable: false, default: '' })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
