import { Body, Controller, Get, Module, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PrestamoEntity } from '../../models/entity/prestamo.entity';
import { PrestamoManagerImpl } from '../../services/prestamos/impl/prestamos.services.impl';
import { SolicitudPrestamoDto } from '../../models/dto/solicitudPrestamo.dto';
import { RespuestaPrestamoDto } from 'src/models/dto/respuestaPrestamo.dto';

@Controller("prestamo")
export class PrestamoController {
  constructor(
    private prestamosManager: PrestamoManagerImpl) { }

  @Post()
  async registrarPrestamo(@Body() prestamo: SolicitudPrestamoDto): Promise<RespuestaPrestamoDto> {
    return this.prestamosManager.registrarPrestamo(prestamo);
  }

  @Get(":id")
  async findPrestamoById(@Param('id', ParseIntPipe) idPrestamo: number): Promise<PrestamoEntity> {
    return this.prestamosManager.findPrestamoById(idPrestamo);
  }
}
