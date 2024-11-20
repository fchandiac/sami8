import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePassword {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}