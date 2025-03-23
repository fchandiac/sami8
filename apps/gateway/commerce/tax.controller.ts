// apps/gateway/commerce/commerce.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateTaxDto } from 'libs/dto/commerce/tax/create-tax.dto';
import { UpdateTaxDto } from 'libs/dto/commerce/tax/update-tax.dto';

@Controller('tax')
export class TaxController {
  constructor(
    @Inject('COMMERCE_SERVICE') private readonly commerceCliente: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health')
  async healthCheck(): Promise<string> {
    // Llama al microservicio para verificar su salud
    const health = this.commerceCliente.send<string>({ cmd: 'health-tax' }, {});
    return lastValueFrom(health); // Convierte el Observable en una Promesa
  }

  @Post('create')
  async createTax(@Body() dto: CreateTaxDto): Promise<any> {
    // Llama al microservicio para crear un impuesto
    const tax = this.commerceCliente.send<any>({ cmd: 'create-tax' }, dto);
    return lastValueFrom(tax); // Convierte el Observable en una Promesa
  }

  @Post('update')
  async updateTax(@Body() dto: UpdateTaxDto): Promise<any> {
    // Llama al microservicio para actualizar un impuesto
    const tax = this.commerceCliente.send<any>({ cmd: 'update-tax' }, dto);
    return lastValueFrom(tax); // Convierte el Observable en una Promesa
  }

  @Post('delete')
  async deleteTax(@Query('id') id: string): Promise<any> {
    // Llama al microservicio para eliminar un impuesto
    const tax = this.commerceCliente.send<any>({ cmd: 'delete-tax' }, id);
    return lastValueFrom(tax); // Convierte el Observable en una Promesa
  }

  //  @MessagePattern({ cmd: 'find-all-taxes-by-commerce-id' })

  @Post('findAllTaxesByCommerceId')
  async findAllTaxesByCommerceId(@Query('commerceId') commerceId: string): Promise<any> {
    // Llama al microservicio para obtener todos los impuestos de un comercio
    const taxes = this.commerceCliente.send<any>({ cmd: 'find-all-taxes-by-commerce-id' }, commerceId);
    return lastValueFrom(taxes); // Convierte el Observable en una Promesa
  }
 
}
