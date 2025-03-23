
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { TaxService } from './tax.service';


@Controller()
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'health-tax' })
  async health(): Promise<string> {
    return this.taxService.health(); // Delegamos la lógica al servicio
  }

  //async createTax
  @MessagePattern({ cmd: 'create-tax' })
    async createTax(
        @Payload() data: any,
        @Ctx() context: RmqContext,
    ): Promise<any> {
        try {
        return this.taxService.createTax(data);
        } catch (error) {
        throw new RpcException({
            statusCode: 500,
            message: error.message,
        });
        }
    }

    //updateTax

    @MessagePattern({ cmd: 'update-tax' })
    async updateTax(
        @Payload() data: any,
        @Ctx() context: RmqContext,
    ): Promise<any> {
        try {
        return this.taxService.updateTax(data);
        } catch (error) {
        throw new RpcException({
            statusCode: 500,
            message: error.message,
        });
        }
    }


    //async deleteTax
    @MessagePattern({ cmd: 'delete-tax' })
    async deleteTax(
        @Payload() data: any,
        @Ctx() context: RmqContext,
    ): Promise<any> {
        try {
        return this.taxService.deleteTax(data.id);
        } catch (error) {
        throw new RpcException({
            statusCode: 500,
            message: error.message,
        });
        }
    }



    @MessagePattern({ cmd: 'find-all-taxes-by-commerce-id' })
    async findAllTaxesByCommerceId(
        @Payload() data: any,
        @Ctx() context: RmqContext,
    ): Promise<any> {
        try {
        return this.taxService.findAllTaxesByCommerceId(data.commerceId);
        } catch (error) {
        throw new RpcException({
            statusCode: 500,
            message: error.message,
        });
        }
    }
}