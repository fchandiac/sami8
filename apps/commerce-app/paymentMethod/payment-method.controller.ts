
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from 'libs/entities/commerce/payment-method.entity';

@Controller()
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'health' })
  async health(): Promise<string> {
    return this.paymentMethodService.health(); // Delegamos la lógica al servicio
  }

}


