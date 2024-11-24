import { BadRequestException, Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriaDto } from './dto/create/create-categoria.dto';
import { CategoriaService } from './categoria.service';

@Controller('api/categoria')
export class CategoriaController {

constructor(private categoriaSvc: CategoriaService) {}

    @Get('/')
    async listarCategorias() {
        return await this.categoriaSvc.listarCategorias();
    }
    @Post('/')
    async insertarCategorias(@Body() categoria: CategoriaDto) {
        // Verificar si ya existe el nombre de categoria
        var verificar = await this.categoriaSvc.verificarCategoria(categoria.descripcion);
        if (verificar.length > 0) {
            throw new BadRequestException('El nombre de la categoria ya existe');
        }

        return await this.categoriaSvc.insertarCategorias(categoria);
    }
    @Patch(':cveCategoria')
    async actualizarCategorias(@Param('cveCategoria', ParseIntPipe) cveCategoria: number, @Body() categoria: CategoriaDto) {
        
        // Verificar si ya existe el nombre de categoria
        var verificar = await this.categoriaSvc.verificarCategoriaEditar(cveCategoria, categoria.descripcion);
        if (verificar.length > 0) {
            throw new BadRequestException('El nombre de la categoria ya existe');
        }

        return await this.categoriaSvc.actualizarCategorias(cveCategoria, categoria )
    }

    @Delete(':cveCategoria')
    async eliminarCategorias(@Param('cveCategoria', ParseIntPipe) cveCategoria: number) {
        return await this.categoriaSvc.eliminar(cveCategoria);
    }

    @Patch(':cveCategoria/:estatus')
    async cambiarEstatusCategoria(@Param('cveCategoria', ParseIntPipe) cveCategoria: number, @Param('estatus', ParseBoolPipe) estatus: boolean) {
        return await this.categoriaSvc.cambiarEstatus(cveCategoria, estatus)
    }

}
