
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
  @MessagePattern({ cmd: 'health-payment' })
  async health(): Promise<string> {
    return this.paymentMethodService.health(); // Delegamos la lógica al servicio
  }

  @MessagePattern({ cmd: 'create-payment-method' })
  async createPaymentMethod(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<PaymentMethod> {
    try {
      return this.paymentMethodService.createPaymentMethod(data);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message,
      });
    }
  }

  //  async deletePaymentMethod(id: string): Promise<void> {

  @MessagePattern({ cmd: 'delete-payment-method' })
  async deletePaymentMethod(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    try {
      return this.paymentMethodService.deletePaymentMethod(data.id);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message,
      });
    }
  }

  @MessagePattern({ cmd: 'update-payment-method' })
  async updatePaymentMethod(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<PaymentMethod> {
    try {
      // console.log('updatePaymentMethod:', data);
      return this.paymentMethodService.updatePaymentMethod(data);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message,
      });
    }
  }
  

}


