import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { Commerce } from 'libs/entities/commerce/commerce.entity';
import { Provider } from 'libs/entities/commerce/provider.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>,
  ) {}

  async health(): Promise<string> {
    return 'provider Microservice is healthy';
  }

  async findAllByCommerceId(commerceId: string): Promise<Provider[]> {
    return this.providerRepository.find({ where: { commerce: { id: commerceId } } });
  }
}
