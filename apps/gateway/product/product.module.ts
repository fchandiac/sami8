// apps/gateway/commerce/commerce.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'libs/config';
import { CategoryController } from './category.controller';
import { FamilyController } from './family.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE', // Nombre del cliente para la inyección
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmq.url],
          queue: 'product_queue', // Nombre de la cola de RabbitMQ
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [CategoryController, FamilyController], // Controlador para manejar las rutas relacionadas con commerce
})
export class ProductModule {}
