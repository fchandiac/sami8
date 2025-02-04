import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, Min, Max, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class  CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convertir a booleano
  credit: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convertir a booleano
  allowsInstallments?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10)) // Convertir a número
  @Min(0)
  maxInstallments?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value)) // Convertir a número decimal
  @Min(0)
  comission?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convertir a booleano
  canBeDeleted?: boolean;

  @IsUUID()
  commerceId?: string; // ID del comercio asociado

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convertir a booleano
  @IsOptional()
  purchase?: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convertir a booleano
  @IsOptional()
  sell?: boolean;


}
