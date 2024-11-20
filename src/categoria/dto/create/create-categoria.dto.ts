import { IsInt, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";

export class CategoriaDto{

    @IsString()
    @IsNotEmpty()
    descripcion: string;

}