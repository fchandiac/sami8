import { Module } from '@nestjs/common';
import { CommerceService } from './commerce/commerce.service';
import { CommerceController } from './commerce/commerce.controller';
import { PaymentMethodController } from './paymentMethod/payment-method.controller';
import { PaymentMethodService } from './paymentMethod/payment-method.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commerce } from 'libs/entities/commerce/commerce.entity';
import { PaymentMethod } from 'libs/entities/commerce/payment-method.entity';
import { envs } from 'libs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Tax } from 'libs/entities/commerce/tax.entity';
import { TaxService } from './tax/tax.service';
import { TaxController } from './tax/tax.controller';
import { PricesList } from 'libs/entities/commerce/prices-list.entity';
import { PricesListService } from './pricesList/prices-list.service';
import { PicesListController } from './pricesList/prices-list.controller';
import { Customer } from 'libs/entities/commerce/customer.entity';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { Provider } from 'libs/entities/commerce/provider.entity';
import { ProviderService } from './provider/provider.service';
import { ProviderController } from './provider/provider.controller';

@Module({
  imports: [
    // Importamos los servicios
    TypeOrmModule.forFeature([Commerce, PaymentMethod, Tax, PricesList, Customer, Provider]), // Importamos las entidades
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.database.commerceDatabaseName,
      entities: [Commerce, PaymentMethod, Tax, PricesList, Customer, Provider],
      synchronize: true,
      //dropSchema: true,
    }),
    // Registro del cliente RabbitMQ para AUTH_SERVICE
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmq.url],
          queue: 'auth_queue',
          noAck: true,
          queueOptions: { durable: true },
        },
      },
    ]),
    // Registro del cliente RabbitMQ para PRODUCT_SERVICE
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitmq.url],
          queue: 'product_queue',
          noAck: true,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [
    CommerceController,
    PaymentMethodController,
    TaxController,
    PicesListController,
    CustomerController,
    ProviderController,
  ], // Aquí definimos todos los controladores
  providers: [
    CommerceService,
    PaymentMethodService,
    TaxService,
    PricesListService,
    CustomerService,
    ProviderService,
  ], // Aquí definimos todos los servicios
  exports: [], // Proveedores para todos los servicios
})
export class CommerceAppModule {}
