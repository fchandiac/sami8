import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { Customer } from 'libs/entities/commerce/customer.entity';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'health-customer' })
  async health(): Promise<string> {
    return this.customerService.health(); // Delegamos la lógica al servicio
  }

  @MessagePattern({ cmd: 'find-all-customers' })
  async findAllCustomers(): Promise<Customer[]> {
    return this.customerService.findAllCustomers();
  }

  //async createCustomer
  @MessagePattern({ cmd: 'create-customer' })
  async createCustomer(@Payload() dto: any): Promise<Customer> {
    return this.customerService.createCustomer(dto);
  }

  //async findAllCustomersByCommerceId(commerceId: string): Promise<Customer[]> {
  @MessagePattern({ cmd: 'find-all-customers-by-commerce-id' })
  async findAllCustomersByCommerceId(
    @Payload() commerceId: string,
  ): Promise<Customer[]> {
    return this.customerService.findAllCustomersByCommerceId(commerceId);
  }
}
