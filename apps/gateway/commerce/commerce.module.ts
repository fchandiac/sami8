

// apps/gateway/commerce/commerce.module.ts
import { Module } from '@nestjs/common';
import { CommerceController } from '../commerce/comerce.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'libs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMERCE_SERVICE', // Nombre del cliente para la inyección
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmq.url],
          queue: 'commerce_queue', // Nombre de la cola de RabbitMQ
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [CommerceController], // Controlador para manejar las rutas relacionadas con commerce
})
export class CommerceModule {}