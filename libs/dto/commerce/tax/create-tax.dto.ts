
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, Min, Max, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class  CreateTaxDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value)) // Convertir a número decimal
  @Min(0)
  percentage?: number;

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
