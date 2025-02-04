// apps/gateway/commerce/commerce.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentMethodDto } from 'libs/dto/commerce/paymentMethod/create-payment-method.dto';
import { UpdatePaymentMethodDto } from 'libs/dto/commerce/paymentMethod/update-payment-method.dto';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(
    @Inject('COMMERCE_SERVICE') private readonly commerceCliente: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health')
  async healthCheck(): Promise<string> {
    // Llama al microservicio para verificar su salud
    const health = this.commerceCliente.send<string>({ cmd: 'health' }, {});
    return lastValueFrom(health); // Convierte el Observable en una Promesa
  }

  @Post('create')
  async createPaymentMethod(@Body() dto: CreatePaymentMethodDto): Promise<any> {
    // Llama al microservicio para crear un método de pago
    const paymentMethod = this.commerceCliente.send<any>({ cmd: 'create-payment-method' }, dto);
    return lastValueFrom(paymentMethod); // Convierte el Observable en una Promesa
  }

  @Post('delete')
  async deletePaymentMethod(@Query('id') id: string): Promise<any> {
    // Llama al microservicio para eliminar un método de pago
    const paymentMethod = this.commerceCliente.send<any>({ cmd: 'delete-payment-method' }, { id });
    return lastValueFrom(paymentMethod); // Convierte el Observable en una Promesa
  }

  @Post('update')
  async updatePaymentMethod(@Body() dto: UpdatePaymentMethodDto): Promise<any> {
    // Llama al microservicio para actualizar un método de pago
    //console.log('updatePaymentMethod:', dto);
    const paymentMethod = this.commerceCliente.send<any>({ cmd: 'update-payment-method' }, dto);
    return lastValueFrom(paymentMethod); // Convierte el Observable en una Promesa
  }


  
}
