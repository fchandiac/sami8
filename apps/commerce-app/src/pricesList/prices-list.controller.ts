import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { PricesListService } from './prices-list.service';
import { CreatePricesListDto } from '../../../../libs/dto/commerce/pricesList/create-prices-list.dto';
import { PricesList } from '../../../../libs/entities/commerce/prices-list.entity';

@Controller()
export class PicesListController {
  constructor(private readonly picesListService: PricesListService) {}

  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'health-prices-list' })
  async health(): Promise<string> {
    return this.picesListService.health(); // Delegamos la lógica al servicio
  }


  // Maneja el mensaje de creación de lista de precios
  @MessagePattern({ cmd: 'create-prices-list' })
  async createPricesList(
    @Payload() createPricesListDto: CreatePricesListDto,
    @Ctx() context: RmqContext,
  ): Promise<PricesList> {
    try {
      return this.picesListService.cretePricesList(createPricesListDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // Maneja el mensaje de obtención de todas las listas de precios
  @MessagePattern({ cmd: 'find-all-prices-list' })
  async findAllPricesList(@Ctx() context: RmqContext): Promise<PricesList[]> {
    try {
      return this.picesListService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
