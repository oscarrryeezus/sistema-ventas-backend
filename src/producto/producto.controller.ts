import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductoDto } from './dto/create/producto.dto';
import { ProductoService } from './producto.service';

@Controller('api/producto')
export class ProductoController {

    constructor(private productoSvc: ProductoService) { }

    @Get('/')
    async listarProductos() {
        return await this.productoSvc.listarProductos();
    }

    @Post('/')
    async insertarProductos(@Body() producto: ProductoDto) {
        return await this.productoSvc.insertarProductos(producto);
    }

    @Patch(':cveProducto')
    async actualizarProductos(@Param('cveProducto', ParseIntPipe) cveProducto: number, @Body() producto: ProductoDto) {
        return await this.productoSvc.actualizarProductos(cveProducto, producto)
    }

    @Delete(':cveProducto')
    async eliminarProductos(@Param('cveProducto', ParseIntPipe) cveProducto: number) {
        return await this.productoSvc.eliminar(cveProducto);
    }

    @Patch(':cveProducto/:estatus')
    async cambiarEstatusProducto(
        @Param('cveProducto', ParseIntPipe) cveProducto: number,
        @Param('estatus', ParseBoolPipe) estatus: boolean
    ) {
        return await this.productoSvc.cambiarEstatus(cveProducto, estatus)
    }

}
