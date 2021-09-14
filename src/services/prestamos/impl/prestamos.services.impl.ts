import { PrestamoEntity } from '../../../models/entity/prestamo.entity';
import { SolicitudPrestamoDto } from '../../../models/dto/solicitudPrestamo.dto';
import { PrestamoManager } from '../prestamos.services'
import { InjectRepository } from '@nestjs/typeorm';
import { RespuestaPrestamoDto } from '../../../models/dto/respuestaPrestamo.dto';

import { TipoUsuario, MagicNumber } from '../../../utils/Constantes';
import { DateUtil } from '../../../utils/date.util';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';


export class PrestamoManagerImpl implements PrestamoManager {
    constructor(@InjectRepository(PrestamoEntity)
    private prestamosDao: Repository<PrestamoEntity>) {
    }

    async registrarPrestamo(solicitudPrestamo: SolicitudPrestamoDto): Promise<RespuestaPrestamoDto> {
        const prestamo = new PrestamoEntity();
        prestamo.fechaMaximaDevolucion = await this.getFechaDevolucion(solicitudPrestamo);
        prestamo.identificacionUsuario = solicitudPrestamo.identificacionUsuario;
        prestamo.isbn = solicitudPrestamo.isbn;
        prestamo.tipoUsuario = solicitudPrestamo.tipoUsuario;
        await this.prestamosDao.insert(prestamo);

        const respuestaPrestamo = new RespuestaPrestamoDto();
        respuestaPrestamo.id = prestamo.id;
        respuestaPrestamo.fechaMaximaDevolucion = prestamo.fechaMaximaDevolucion;
        return respuestaPrestamo;
    }

    async findPrestamoById(idPrestamo: number): Promise<PrestamoEntity> {
        return await this.prestamosDao.findOne({ id: idPrestamo });
    }

    private async getFechaDevolucion(solicitudPrestamo: SolicitudPrestamoDto): Promise<string> {
        switch (solicitudPrestamo.tipoUsuario) {
            case TipoUsuario.USUARIO_AFILIADO:
                return DateUtil.addDaysSkippingWeekends(MagicNumber.DIES);
            case TipoUsuario.USUARIO_EMPLEADO:
                return DateUtil.addDaysSkippingWeekends(MagicNumber.OCHO);
            case TipoUsuario.USUARIO_INVITADO:
                const prestamoExistente = await this.prestamosDao.findOne({ identificacionUsuario: solicitudPrestamo.identificacionUsuario })
                if (prestamoExistente) {
                    throw new HttpException({ mensaje: `El usuario con identificación ${solicitudPrestamo.identificacionUsuario} ya tiene un libro prestado por lo cual no se le puede realizar otro préstamo`, status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
                }
                return DateUtil.addDaysSkippingWeekends(MagicNumber.SIETE);
            default:
                throw new HttpException({ mensaje: 'Tipo de usuario no permitido en la biblioteca', status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
        }
    }
}