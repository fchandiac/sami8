// apps/gateway/commerce/commerce.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateCommerceDto } from '../../../libs/dto/commerce/commerce/create-commerce.dto';

@Controller('commerce')
export class CommerceController {
  constructor(
    @Inject('COMMERCE_SERVICE') private readonly commerceCliente: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health')
  async healthCheck(): Promise<string> {
    // Llama al microservicio para verificar su salud
    const health = this.commerceCliente.send<string>({ cmd: 'health' }, {});
    return lastValueFrom(health); // Convierte el Observable en una Promesa
  }

 

  @Post('createCommerce')
  async createCommerce(@Body() dto: CreateCommerceDto): Promise<string> {
    //@ts-ignore
    return this.commerceCliente.send<string>({ cmd: 'create-commerce' }, { dto });
  }


  @Get('findCommerceByUserId')
  async findCommerceByUserId(@Query() data: string): Promise<string> {

    //@ts-ignore
    return this.commerceCliente.send<string>({ cmd: 'find-commerce-by-user-id' }, { data });
  }


  @Get('findAllCommerces')
  async findAllCommerces(): Promise<string> {
    //@ts-ignore
    return this.client.send<string>({ cmd: 'find-all-commerces' }, {});
  }
}
