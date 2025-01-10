import { Module } from '@nestjs/common';
import { Commerce } from 'libs/entities/commerce/commerce.entity';
import { PaymentMethod } from 'libs/entities/commerce/payment-method.entity';
import { envs } from 'libs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices'; // Importa ClientsModule para RabbitMQ
import { CommerceService } from '../commerce/commerce.service';
import { CommerceController } from '../commerce/commerce.controller';

@Module({
  imports: [
    // Conexión a la base de datos
    TypeOrmModule.forFeature([Commerce, PaymentMethod]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.database.commerceDatabaseName,
      entities: [Commerce, PaymentMethod], // Asegúrate de incluir todas las entidades
      synchronize: true,
      //dropSchema: true, // Sólo para desarrollo; coméntalo en producción
    }),
    // Registro del cliente RabbitMQ para AUTH_SERVICE
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE', // Nombre del cliente para inyección
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmq.url], // URL de conexión a RabbitMQ
          queue: 'auth_queue', // Cola que usa AUTH_SERVICE
          noAck: true,
          queueOptions: {
            durable: true, // Cola persistente
          },
        },
      },
    ]),
  ],
  controllers: [CommerceController], // Controladores del módulo
  providers: [CommerceService], // Servicios del módulo
})
export class CommerceAppModule {}
