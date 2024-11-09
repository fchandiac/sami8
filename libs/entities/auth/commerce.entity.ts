import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Commerce {
  @PrimaryGeneratedColumn('uuid')  // Usamos 'uuid' para que el id sea un UUID
  id: string;

  @Column()
  name: string;

  @Column()
  rut: string;

  @Column()
  liorenToken: string;

  @ManyToOne(() => User, (user) => user.commerces)  // Relación con el User (un User puede tener muchos Commerces)
  @JoinColumn({ name: 'userId' })  // Definimos que 'userId' será la columna que conecta con la entidad User
  user: User;

  @Column()
  userId: string;  // Este es el campo que se utilizará para la relación

  @UpdateDateColumn()  // Columna para la fecha de la última actualización
  updatedAt: Date;

  @DeleteDateColumn()  // Columna para la eliminación suave (soft delete)
  deletedAt: Date;
}
