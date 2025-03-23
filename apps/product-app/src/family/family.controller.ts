import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { FamilyService } from './family.service';
import { Family } from '../../../../libs/entities/product/family.entity';
import { CreateFamilyDto } from 'libs/dto/products/create-family.dto';

@Controller()
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @MessagePattern({ cmd: 'health-family' })
  async health(): Promise<string> {
    return this.familyService.health();
  }

  //  async findAll()
  @MessagePattern({ cmd: 'findAll-family' })
  async findAll(): Promise<Family[]> {
    return this.familyService.findAll();
  }

  @MessagePattern({ cmd: 'create-family' })
  async createFamily(
    @Payload() data: CreateFamilyDto,
    @Ctx() context: RmqContext,
  ): Promise<Family> {
    // console.log(data);
    try {
      //@ts-ignore
      const family = await this.familyService.createFamily(data.dto);
      return family;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  //  async findAllByCommerceId(commerceId: string)

  @MessagePattern({ cmd: 'find-all-family-by-commerce-id' })
  async findAllByCommerceId(
    @Payload() data: { commerceId: string },
    @Ctx() context: RmqContext,
  ): Promise<Family[]> {
    try {
      return this.familyService.findAllByCommerceId(data.commerceId);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // updateFamily(dto: UpdateFamilyDto)

  @MessagePattern({ cmd: 'update-family' })
  async updateFamily(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<Family> {
    try {
      return this.familyService.updateFamily(data.dto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  //   async findFamilyById(id: string): Promise<Family> {

  @MessagePattern({ cmd: 'find-family-by-id' })
  async findFamilyById(
    @Payload() data: { id: string },
    @Ctx() context: RmqContext,
  ): Promise<Family> {
    try {
      return this.familyService.findFamilyById(data.id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
