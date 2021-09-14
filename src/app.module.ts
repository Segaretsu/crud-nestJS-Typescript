import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './controllers/usuarios/usuario.controller';
import { Usuario } from './models/entity/user.entity';

import { PrestamoEntity } from './models/entity/prestamo.entity';
import { PrestamoModule } from './prestamo.module';

/**
 * NestJs es un framework modular, acá se puso todo el manejo del objeto Usuario desde el App modulo, que es el que da inicio a todo el proyecto
 * En su solución planteada, debería tratar de separar nuevos modulos con sus responsabilidades definidas
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: "sqlite",
        database: ":memory:", //Indica que es una base de datos en memoria y se reinicia en cada ejecución
        entities: [Usuario, PrestamoEntity], // Se definen las entidades va administrar (y las cuales creara como tablas al momento de inicar la app)
        synchronize: true
      }),
    TypeOrmModule.forFeature([Usuario, PrestamoEntity]),
    PrestamoModule //Administración de entidades debería hacerce solo en cada modulo encargado de la entidad
  ],
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule { }
