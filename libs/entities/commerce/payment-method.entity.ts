import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';



interface IPaymentMethod {
  id: string;
  name: string; // efectivo, tarjeta, cheque
  credit: boolean; // si no otorga crédito automáticamente es sin cuotas
  allowsInstallments?: boolean; // Indica si permite cuotas
  maxInstallments?: number; // Cantidad máxima de cuotas
  comission?: number;
  canBeDeleted?: boolean;
  commerceId?: string; // ID del comercio asociado
}

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type:'varchar', length:100, nullable: false })
  name: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  credit: boolean;

  @Column({ type: 'boolean', default: false, nullable: true })
  allowsInstallments?: boolean;

  @Column({ type: 'int', nullable: true, default: 0 })
  maxInstallments?: number;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  comission?: number;


  @Column({ type: 'boolean', nullable: true })
  canBeDeleted?: boolean;


  @Column({ type: 'uuid', nullable: true })
  commerceId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
