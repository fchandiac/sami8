
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCommerceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/, {
    message:
      'The RUT format is invalid. It should be like 11.111.111-1 or 1.111.111-1',
  })
  rut: string;

  @IsString()
  @IsNotEmpty()
  liorenToken: string;

  @IsString()
  userId: string;
}
