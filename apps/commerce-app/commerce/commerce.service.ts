import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Commerce } from 'libs/entities/commerce/commerce.entity';
import { ByIdDto } from 'libs/dto/common/by-id.dto';
import { CreateCommerceDto } from 'libs/dto/commerce/commerce/create-commerce.dto';

@Injectable()
export class CommerceService {
  constructor(
    @InjectRepository(Commerce)
    private readonly commerceRepository: Repository<Commerce>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async health(): Promise<string> {
    return 'Commerce Microservice is healthy';
  }

  async createCommerce(dto: CreateCommerceDto): Promise<Commerce> {
    const { name, rut, identity } = dto;
    const commerce = this.commerceRepository.create({
      name,
      rut,
      identity,
    });
    await this.commerceRepository.save(commerce);
    return commerce;
  }

  async findCommerceByUserId(userId: string): Promise<Commerce> {

    const user = await this.authClient.send<string>({ cmd: 'find-user-by-id' }, { id: userId }).toPromise();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const commerce = await this.commerceRepository.findOne({
      where: {
        // @ts-ignore
        id: user.commerceId,
      },
    });

    if (!commerce) {
      throw new NotFoundException('Commerce not found');
    }

    return commerce;

  }
}
