import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Commerce } from './commerce.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')  // Se usa 'uuid' para que el id sea generado automáticamente como UUID
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  //@Column({ select: false })
  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({default: ''})
  workCommerce: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Commerce, (commerce) => commerce.user)
  commerces: Commerce[];
}
