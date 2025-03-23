// apps/gateway/commerce/commerce.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateCategoryDto } from 'libs/dto/products/create-category.dto';
import { UpdateCategoryDto } from 'libs/dto/products/update-category.dto';


@Controller('category')
export class CategoryController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productCliente: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health')
  async healthCheck(): Promise<string> {
    // Llama al microservicio para verificar su salud
    const health = this.productCliente.send<string>({ cmd: 'health-category' }, {});
    return lastValueFrom(health); // Convierte el Observable en una Promesa
    // return 'ok';
  }

  //  @MessagePattern({ cmd: 'create-category' })

    @Post('create')
    async createCategory(@Body() dto: CreateCategoryDto ): Promise<any> {
      const result = this.productCliente.send<any>({ cmd: 'create-category' }, dto);
      return lastValueFrom(result);
    } 



    @Get('findAll')
    async findAllCategory(): Promise<any> {
      const result = this.productCliente.send<any>({ cmd: 'find-all-category' }, {});
      return lastValueFrom(result);
    }

    // findAllByCommerceId
      //@MessagePattern({ cmd: 'find-all-category-by-commerce-id' })
    @Get('findAllByCommerceId')
    async findAllByCommerceId(@Query('commerceId') commerceId: string): Promise<any> {
      const result = this.productCliente.send<any>({ cmd: 'find-all-category-by-commerce-id' }, { commerceId });
      return lastValueFrom(result);
    }

    //  @MessagePattern({ cmd: 'update-category' })
    @Post('update')
    async updateCategory(@Body() dto: UpdateCategoryDto ): Promise<any> {
      const result = this.productCliente.send<any>({ cmd: 'update-category' }, dto);
      return lastValueFrom(result);
    }
}