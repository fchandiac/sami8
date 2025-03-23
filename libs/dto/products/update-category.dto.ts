import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  familyId: string;
}
