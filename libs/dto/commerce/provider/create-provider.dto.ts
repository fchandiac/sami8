import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsEmail,
    IsPhoneNumber,
    IsUUID,
    Matches,
  } from 'class-validator';
  
  export class CreateProviderDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    socialReason?: string;
  
    @IsNotEmpty()
    @IsString()
     @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/, {
        message:
          'The RUT format is invalid. It should be like 11.111.111-1 or 1.111.111-1',
      })
    rut: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    state?: string; // Región
  
    @IsOptional()
    @IsString()
    city?: string; // Comuna
  
    @IsNotEmpty()
    @IsUUID()
    commerceId: string; // ID del comercio al que pertenece el cliente
  }
  