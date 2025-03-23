import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateFamilyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  commerceId: string;
}
