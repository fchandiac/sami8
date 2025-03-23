import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateCustomerDto } from '../../../libs/dto/commerce/customer/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    @Inject('COMMERCE_SERVICE') private readonly commerceCliente: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health')
  async healthCheck(): Promise<string> {
    // Llama al microservicio para verificar su salud
    const health = this.commerceCliente.send<string>(
      { cmd: 'health-customer' },
      {},
    );
    return lastValueFrom(health); // Convierte el Observable en una Promesa
  }

  //    @MessagePattern({ cmd: 'find-all-customers' })
  @Get('findAll')
  async findAllCustomers(): Promise<any> {
    //return this.customerService.findAllCustomers();
    const customers = this.commerceCliente.send<any>(
      { cmd: 'find-all-customers' },
      {},
    );
    return lastValueFrom(customers);
  }

  //    @MessagePattern({ cmd: 'create-customer' })

  @Post('create')
  async createCustomer(@Body() dto: CreateCustomerDto): Promise<any> {
    //return this.customerService.createCustomer(dto);
    const customer = this.commerceCliente.send<any>(
      { cmd: 'create-customer' },
      dto,
    );
    return lastValueFrom(customer);
  }

  //async findAllCustomersByCommerceId(commerceId: string): Promise<Customer[]> {
   //@MessagePattern({ cmd: 'find-all-customers-by-commerce-id' })

  @Get('findAllByCommerceId')
  async findAllCustomersByCommerceId(@Query('commerceId') commerceId: string): Promise<any> {
    //return this.customerService.findAllCustomersByCommerceId(commerceId);
    const customers = this.commerceCliente.send<any>(
      { cmd: 'find-all-customers-by-commerce-id' },
      commerceId,
    );
    return lastValueFrom(customers);
  }
}
