import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { Provider} from 'libs/entities/commerce/provider.entity';
import { ProviderService } from './provider.service';

@Controller()
export class ProviderController {
  constructor(private readonly customerService: ProviderService) {}

  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'health-provider' })
  async health(): Promise<string> {
    return this.customerService.health(); // Delegamos la lógica al servicio
  }

  // async findAllByCommerceId(commerceId: string): Promise<Provider[]>

  // Maneja el mensaje de findAllByCommerceId
  @MessagePattern({ cmd: 'find-all-providers-by-commerce-id' })
  async findAllByCommerceId(
    @Payload() commerceId: string,
    @Ctx() context: RmqContext,
  ): Promise<Provider[]> {
    try {
      return this.customerService.findAllByCommerceId(commerceId); // Delegamos la lógica al servicio
    } catch (error) {
      throw new RpcException(error);
    }
  }

}