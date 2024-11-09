// apps/gateway/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'libs/config';

@Module({
  imports: [
    ClientsModule.register([
        {
          name: 'AUTH_SERVICE',  // Nombre del cliente para la inyección
          transport: Transport.RMQ,
          options: {
            urls: [envs.rabbitmq.url],
            queue: 'auth_queue',
            noAck: true,
            queueOptions: {
              durable: true,
            },
          },
        },
      ]),
  ],
  controllers: [AuthController],  // El controlador para manejar las rutas relacionadas con la autenticación
})
export class AuthModule {}
