import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { VentaService } from './venta.service';
import { ProcesarVentaDto } from './dto/create-venta.dto';


@Controller('venta')
export class VentaController {
    constructor(private ventaService: VentaService) { }
    @Get('productos-autocomplete')
    async getProductosAutocomplete(@Query('query') query: string) {
        return this.ventaService.buscarProductosActivos(query);
    }
    @Post('procesar')
    async procesarVenta(@Body() ventaDto: ProcesarVentaDto) {
        return this.ventaService.procesarVenta(ventaDto);
    }
}
