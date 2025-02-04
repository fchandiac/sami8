//update-basic-information-commerce.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateBasicInformationCommerceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
}
