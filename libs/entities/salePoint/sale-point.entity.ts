import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class SalePoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string; // active, inactive
  cashRegisters: any;

  @ManyToOne(() => SalePoint, (salePoint) => salePoint.cashRegisters)
  salePoint: SalePoint;
}
