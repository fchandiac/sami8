import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { Category } from '../../../../libs/entities/product/category.entity';
import { CreateCategoryDto } from 'libs/dto/products/create-category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'health-category' })
  async health(): Promise<string> {
    return this.categoryService.health();
  }

  @MessagePattern({ cmd: 'create-category' })
  async createCategory(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<Category> {
    console.log(data);
    try {
      return this.categoryService.createCategory(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'find-all-category' })
  async findAllCategory(@Ctx() context: RmqContext): Promise<Category[]> {
    try {
      return this.categoryService.findAll();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  //    //findAllByCommerceId
  // async findAllByCommerceId(commerceId: string): Promise<Category[]> {
  //   return this.categoryRepository.find({ where: { commerceId } });
  // }

  @MessagePattern({ cmd: 'find-all-category-by-commerce-id' })
  async findAllByCommerceId(
    @Payload() data: { commerceId: string },
    @Ctx() context: RmqContext,
  ): Promise<Category[]> {
    try {

      return this.categoryService.findAllByCommerceId(data.commerceId);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

    //async updateCategory(dto: UpdateCategoryDto): Promise<Category> {

  @MessagePattern({ cmd: 'update-category' })
  async updateCategory(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<Category> {
    try {
      return this.categoryService.updateCategory(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
