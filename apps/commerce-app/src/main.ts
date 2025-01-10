import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommerceAppModule } from './commerce-app.module';
import { Logger } from '@nestjs/common';
import { envs } from 'libs/config'; // Importar variables de entorno

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommerceAppModule, {
    transport: Transport.RMQ, // Usamos RabbitMQ como transporte
    options: {
      urls: [envs.rabbitmq.url], // URL de RabbitMQ
      queue: 'commerce_queue',   // Nombre de la cola
      noAck: true,
      queueOptions: {
        durable: true,           // La cola debe ser durable
      },
    },
  });

  await app.listen();
  const logger = new Logger('CommerceAppMicroservice');
  logger.log('CommerceApp microservice is running...');
}

bootstrap();
