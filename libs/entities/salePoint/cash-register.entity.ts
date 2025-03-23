import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SalePoint } from './sale-point.entity';


@Entity()
export class CashRegister {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string; // active, inactive

    @ManyToOne(() => SalePoint, (salePoint) => salePoint.cashRegisters)
    salePoint: SalePoint;
}