import { IsNotEmpty, IsString } from "class-validator";

export class FindByEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}