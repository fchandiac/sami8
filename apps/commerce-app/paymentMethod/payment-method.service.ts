import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { PaymentMethod } from 'libs/entities/commerce/payment-method.entity';
import { CreatePaymentMethodDto } from '../../../libs/dto/commerce/paymentMethod/create-payment-method.dto';
import { Commerce } from 'libs/entities/commerce/commerce.entity';
import { UpdatePaymentMethodDto } from 'libs/dto/commerce/paymentMethod/update-payment-method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @InjectRepository(Commerce)
    private readonly commerceRepository: Repository<Commerce>,
  ) {}

  async health(): Promise<string> {
    return 'PaymentMethod Microservice is healthy';
  }

  async createPaymentMethod(
    dto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const {
      name,
      credit,
      allowsInstallments,
      maxInstallments,
      comission,
      canBeDeleted,
      commerceId,
      sell,
      purchase,
    } = dto;

    const commerce = await this.commerceRepository.findOne({
      where: {
        id: commerceId,
      },
    });

    if (!commerce) {
      throw new NotFoundException('Commerce not found');
    }

    const paymentMethod = this.paymentMethodRepository.create({
      name,
      credit,
      allowsInstallments,
      maxInstallments,
      comission,
      canBeDeleted,
      sell,
      purchase,
    });

    paymentMethod.commerce = commerce;

    await this.paymentMethodRepository.save(paymentMethod);
    return paymentMethod;
  }

  async deletePaymentMethod(id: string): Promise<any> {
    try {
      const paymentMethod = await this.paymentMethodRepository.findOneBy({
        id,
      });

      if (!paymentMethod) {
        throw new NotFoundException('Payment method not found');
      }

      // Si quieres que el método devuelva algo (ejemplo: objeto eliminado), puedes capturarlo
      // paymentMethod.deletedAt = new Date();
      // await this.paymentMethodRepository.save(paymentMethod);
      await this.paymentMethodRepository.delete(id);
      return {
        message: 'Payment method deleted successfully',
        status: 200,
      };
    } catch (error) {
      // Manejo de excepciones específicas
      if (error instanceof NotFoundException) {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
        });
      }

      // Lanzar una excepción genérica para otros tipos de errores
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error while deleting payment method.',
      });
    }
  }

  async updatePaymentMethod(
    dto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {

    //console.log('updatePaymentMethod:', dto);



    const {
      id,
      name,
      credit,
      allowsInstallments,
      maxInstallments,
      comission,
      canBeDeleted,
      sell,
      purchase,
    } = dto;

 

    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: {
        id,
      },
    });

    //console.log('paymentMethod:', paymentMethod);

    if (!paymentMethod) {
      throw new NotFoundException('Payment method not found');
    }

    paymentMethod.name = name;
    paymentMethod.credit = credit;
    paymentMethod.allowsInstallments = allowsInstallments;
    paymentMethod.maxInstallments = maxInstallments;
    paymentMethod.comission = comission;
    paymentMethod.canBeDeleted = canBeDeleted;
    paymentMethod.sell = sell;
    paymentMethod.purchase = purchase;

    await this.paymentMethodRepository.save(paymentMethod);
    return paymentMethod;
  }
}
