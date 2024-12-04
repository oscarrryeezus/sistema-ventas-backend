import { IsNumber, IsArray, ValidateNested, Min, IsInt} from "class-validator";

export class ProcesarVentaDto {
    @IsNumber()
    @Min(0)
    totalVenta: number;
  
    @IsInt()
    cveUsuario: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    productos: ProductoVentaDto[];
  }
  
  export class ProductoVentaDto {
    @IsInt()
    cveProducto: number;
  
    @IsInt()
    @Min(1)
    cantidad: number;
  
    @IsNumber()
    precioProducto: number;
  }
  