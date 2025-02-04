
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreatePricesListDto } from '../../../libs/dto/commerce/pricesList/create-prices-list.dto';


@Controller('prices-list')
export class PricesListController {
  constructor(
    @Inject('COMMERCE_SERVICE') private readonly commerceCliente: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health')
  async healthCheck(): Promise<string> {
    // Llama al microservicio para verificar su salud
    const health = this.commerceCliente.send<string>({ cmd: 'health-prices-list' }, {});
    return lastValueFrom(health); // Convierte el Observable en una Promesa
  }


    // // Maneja el mensaje de creación de lista de precios
    // @MessagePattern({ cmd: 'create-prices-list' })
    // async createPricesList(
    //   @Payload() createPricesListDto: CreatePricesListDto,
    //   @Ctx() context: RmqContext,
    // ): Promise<PricesList> {
    //   try {
    //     return this.picesListService.cretePricesList(createPricesListDto);
    //   } catch (error) {
    //     throw new RpcException(error.message);
    //   }
    // }
  
    // // Maneja el mensaje de obtención de todas las listas de precios
    // @MessagePattern({ cmd: 'find-all-prices-list' })
    // async findAllPricesList(@Ctx() context: RmqContext): Promise<PricesList[]> {
    //   try {
    //     return this.picesListService.findAll();
    //   } catch (error) {
    //     throw new RpcException(error.message);
    //   }
    // }

  @Post('createPricesList')
  async createPricesList(@Body() dto: CreatePricesListDto): Promise<any> {
    const pricesList = this.commerceCliente.send<any>({ cmd: 'create-prices-list' }, dto);
    return lastValueFrom(pricesList);
  }

  @Get('findAll')
  async findAllPricesList(): Promise<any> {
    const pricesList = this.commerceCliente.send<any>({ cmd: 'find-all-prices-list' }, {});
    return lastValueFrom(pricesList);
  }
}