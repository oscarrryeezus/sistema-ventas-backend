import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProcesarVentaDto } from './dto/create-venta.dto';

@Injectable()
export class VentaService {

  constructor(private prismaSvc: PrismaService) { }

  async buscarProductosActivos(query: string) {
    return this.prismaSvc.producto.findMany();
  }

  async procesarVenta(dto: ProcesarVentaDto) {
    const productos = dto.productos;

    // Validar cada producto
    for (const producto of productos) {
      const productoDb = await this.prismaSvc.producto.findUnique({
        where: { cveProducto: producto.cveProducto },
      });

      if (!productoDb || productoDb.cantidad < producto.cantidad) {
        throw new Error(`Stock insuficiente para el producto: ${productoDb.descripcion}`);
      }

      // Reducir el stock
      await this.prismaSvc.producto.update({
        where: { cveProducto: producto.cveProducto },
        data: { cantidad: productoDb.cantidad - producto.cantidad },
      });
    }

    // Crear la venta
    const venta = await this.prismaSvc.venta.create({
      data: {
        totalVenta: dto.totalVenta,
        cveUsuario: dto.cveUsuario,
        DetalleVenta: {
          create: productos.map((producto) => ({
            cveProducto: producto.cveProducto,
            cantidad: producto.cantidad,
            precioProducto: producto.precioProducto,
          })),
        },
      },
    });

    return venta;
  }


}
