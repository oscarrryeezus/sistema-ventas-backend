import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductoDto } from './dto/create/producto.dto';

@Injectable()
export class ProductoService {

    constructor(private prismaSvc: PrismaService) {}

    // Método para listar productos
    async listarProductos() {
        return await this.prismaSvc.producto.findMany();
    }

    // Método para insertar productos
    async insertarProductos(producto: ProductoDto) {
        return await this.prismaSvc.producto.create({
            data: {
                descripcion: producto.descripcion,
                cantidad: producto.cantidad,
                precio: producto.precio,
                cveCategoria: producto.cveCategoria,
                estatus: true
            }
        });
    }

    // Método para actualizar productos
    async actualizarProductos(cveProducto: number, producto: ProductoDto) {
        return await this.prismaSvc.producto.update({
            where: {
                cveProducto: cveProducto,
            },
            data: {
                descripcion: producto.descripcion,
                cantidad: producto.cantidad,
                precio: producto.precio, 
                cveCategoria: producto.cveCategoria
            },
        });
    }

    // Método para eliminar productos
    async eliminar(cveProducto: number) {
        return await this.prismaSvc.producto.delete({
            where: {
                cveProducto: cveProducto,
            },
        });
    }

    // Método para cambiar el estatus (activo)
    async cambiarEstatus(cveProducto: number, estatus: boolean) {
        return await this.prismaSvc.producto.update({
            where: {
                cveProducto: cveProducto,
            },
            data: {
                estatus: estatus,  
            },
        });
    }
}
