import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // Se usa 'uuid' para que el id sea generado automáticamente como UUID
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;


  @Column({ nullable: true })
  commerceId: string; // Clave foránea que conecta al usuario con el comercio
}
