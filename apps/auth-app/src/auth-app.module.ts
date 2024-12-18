//apps/auth-app/src/auth-app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importamos TypeOrmModule
import { AuthAppService } from './auth-app.service';
import { User } from 'libs/entities/auth/user.entity';
import { Commerce } from 'libs/entities/auth/commerce.entity';
import { PaymentMethod } from 'libs/entities/auth/payment-method.entity';
import { envs } from 'libs/config';
import { AuthAppController } from './auth-app.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Commerce, PaymentMethod]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.database.authDatabaseName,
      entities: [User, Commerce, PaymentMethod],
      synchronize: true,
    }),

  ],
  controllers: [AuthAppController],
  providers: [AuthAppService, ],
})
export class AuthAppModule {}
