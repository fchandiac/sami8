
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, Min, Max, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class  UpdateTaxDto {
  @IsUUID()
  id?: string; // ID del comercio asociado

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value)) // Convertir a número decimal
  @Min(0)
  percentage?: number;


  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convertir a booleano
  @IsOptional()
  purchase?: boolean;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true) // Convertir a booleano
  @IsOptional()
  sell?: boolean;


}
