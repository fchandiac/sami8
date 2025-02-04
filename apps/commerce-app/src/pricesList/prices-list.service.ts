import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { PricesList } from 'libs/entities/commerce/prices-list.entity';
import { CreatePricesListDto } from 'libs/dto/commerce/pricesList/create-prices-list.dto';
import { Commerce } from 'libs/entities/commerce/commerce.entity';

@Injectable()
export class PricesListService {
  constructor(
    @InjectRepository(PricesList)
    private readonly pricesListRepository: Repository<PricesList>,

    @InjectRepository(Commerce)
    private readonly commerceRepository: Repository<Commerce>,
  ) {}

  async health(): Promise<string> {
    return 'PricesList Microservice is healthy--- To Pelao';
  } 

  async cretePricesList(createPricesListDto: CreatePricesListDto): Promise<PricesList> {
     const { name, sell, favorite, canBeDeleted, commerceId } = createPricesListDto;
      const commerce = await this.commerceRepository.findOne({ where: { id: commerceId } });
      if (!commerce) {
        throw new NotFoundException('Commerce not found');
      }

      const pricesList = this.pricesListRepository.create({
        name,
        sell,
        favorite,
        canBeDeleted,
        commerce,
      });


    return this.pricesListRepository.save(pricesList);
  }

  async findAll(): Promise<PricesList[]> {
    return this.pricesListRepository.find();
  }


}
