// auth-app/src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthAppModule } from './auth-app.module';
import { Logger } from '@nestjs/common';
import { envs } from 'libs/config';  // Importar variables de entorno

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthAppModule, {
    transport: Transport.RMQ,  // Usamos RabbitMQ como transporte
    options: {
      urls: [envs.rabbitmq.url],  // URL de RabbitMQ
      queue: 'auth_queue',        // Nombre de la cola
      noAck: true,
      queueOptions: {
        durable: true,  // La cola debe ser durable
      },
    },
  });

  await app.listen();
  const logger = new Logger('AuthAppMicroservice');
  logger.log('AuthApp microservice is running...');
}

bootstrap();
