import { IsNotEmpty, IsString, IsInt, IsPositive, IsNumber, IsBoolean, Min } from "class-validator";

export class ProductoDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    cantidad: number;

    @IsNumber()
    @IsPositive() 
    @IsNotEmpty()
    precio: number;

    @IsInt()
    @IsNotEmpty()
    cveCategoria: number;
    
}