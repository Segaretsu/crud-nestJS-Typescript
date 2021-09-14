import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PrestamoEntity } from "./models/entity/prestamo.entity";
// import { PrestamoDaoImpl } from "./dao/prestamos/impl/prestamo.dao.impl";
import { PrestamoManagerImpl } from "./services/prestamos/impl/prestamos.services.impl";
import { PrestamoController } from "./controllers/prestamos/prestamos.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([PrestamoEntity]),
        
    ],
    providers: [PrestamoManagerImpl],
    controllers: [PrestamoController],
})
export class PrestamoModule { }