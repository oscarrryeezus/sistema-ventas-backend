import { Module } from '@nestjs/common';
import { DetallesVentaController } from './detalles-venta.controller';
import { DetallesVentaService } from './detalles-venta.service';

@Module({
  controllers: [DetallesVentaController],
  providers: [DetallesVentaService]
})
export class DetallesVentaModule {}
