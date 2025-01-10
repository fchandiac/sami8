import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { CommerceService } from '../commerce/commerce.service';
import { CreateCommerceDto } from '../../../libs/dto/commerce/commerce/create-commerce.dto';
import { Commerce } from 'libs/entities/commerce/commerce.entity';

@Controller()
export class CommerceController {
  constructor(private readonly  commerceService: CommerceService) {}


  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'health' })
  async health(): Promise<string> {
    return this.commerceService.health(); // Delegamos la l
    
  }

  @MessagePattern({ cmd: 'create-commerce' })
  async createCommerce(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<Commerce> {
    return this.commerceService.createCommerce(data.dto);

  }

  @MessagePattern({ cmd: 'find-commerce-by-user-id' })
  async findCommerByUserId(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<Commerce> {
    
    return this.commerceService.findCommerceByUserId(data.userId);
  }
}