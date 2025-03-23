import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductAppModule } from './product-app.module';
import { Logger } from '@nestjs/common';
import { envs } from 'libs/config'; // Importar variables de entorno

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductAppModule, {
    transport: Transport.RMQ, // Usamos RabbitMQ como transporte
    options: {
      urls: [envs.rabbitmq.url], // URL de RabbitMQ
      queue: 'product_queue',   // Nombre de la cola para productos
      noAck: true,
      queueOptions: {
        durable: true,           // La cola debe ser durable
      },
    },
  });

  await app.listen();
  const logger = new Logger('ProductAppMicroservice');
  logger.log('ProductApp microservice is running...');
}

bootstrap();