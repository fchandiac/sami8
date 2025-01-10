import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { ByIdDto } from 'libs/dto/common/by-id.dto';
import { PaymentMethod } from 'libs/entities/commerce/payment-method.entity';


@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async health(): Promise<string> {
    return 'PaymentMethod Microservice is healthy';
  }

}