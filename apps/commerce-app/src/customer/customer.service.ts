import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Customer } from 'libs/entities/commerce/customer.entity';
import { lastValueFrom } from 'rxjs';
import { CreateCustomerDto } from '../../../../libs/dto/commerce/customer/create-customer.dto';
import { Commerce } from 'libs/entities/commerce/commerce.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
  ) {}

  async health(): Promise<string> {
    return 'customer Microservice is healthy';
  }

  async findAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: ['commerce'],
    });
  }

  async findAllCustomersByCommerceId(commerceId: string): Promise<Customer[]> {
    return this.customerRepository.find({
      where: { commerce: { id: commerceId } },
    });
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { email } = createCustomerDto;
    const findCustomer = await this.customerRepository.findOne({
      where: { email },
    });
    if (findCustomer) {
      throw new ConflictException('Customer already exists');
    }

    const findCommerce = await this.commerceRepository.findOne({
      where: { id: createCustomerDto.commerceId },
    });

    if (!findCommerce) {
      throw new NotFoundException('Commerce not found');
    }

    const customer = this.customerRepository.create(createCustomerDto);
    customer.commerce = findCommerce;
    return this.customerRepository.save(customer);
  }
}
