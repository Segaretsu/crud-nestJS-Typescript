import { PrestamoEntity } from '../../models/entity/prestamo.entity';
import { SolicitudPrestamoDto } from '../../models/dto/solicitudPrestamo.dto';
import { RespuestaPrestamoDto } from 'src/models/dto/respuestaPrestamo.dto';

export interface PrestamoManager {
    
    /**
     * Método encargado de registrar un prestamo.
     * @param solicitudPrestamo 
     */
    registrarPrestamo(solicitudPrestamo: SolicitudPrestamoDto): Promise<RespuestaPrestamoDto>;

    /**
     * Método que retorna un prestamo consultado por su id.
     * @param idPrestamo 
     */
    findPrestamoById(idPrestamo: number) : Promise<PrestamoEntity>;
}