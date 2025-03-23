import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';


@Controller('provider')
export class ProviderController {
  constructor(
    @Inject('COMMERCE_SERVICE') private readonly commerceCliente: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health')
  async healthCheck(): Promise<string> {
    // Llama al microservicio para verificar su salud
    const health = this.commerceCliente.send<string>(
      { cmd: 'health-provider' },
      {},
    );
    return lastValueFrom(health); // Convierte el Observable en una Promesa
  }

  //  @MessagePattern({ cmd: 'find-all-providers-by-commerce-id' })
  @Get('findAllByCommerceId')
  async findAllByCommerceId(@Query('commerceId') commerceId: string): Promise<any> {
    // Llama al microservicio para obtener los proveedores por comercio
    const providers = this.commerceCliente.send<any>(
      { cmd: 'find-all-providers-by-commerce-id' },
      commerceId,
    );
    return lastValueFrom(providers); // Convierte el Observable en una Promesa
  }
}