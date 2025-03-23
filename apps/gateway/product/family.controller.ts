import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { CreateFamilyDto } from 'libs/dto/products/create-family.dto';
import { UpdateFamilyDto } from 'libs/dto/products/update-family.dto';

@Controller('family') // Ruta base para este controlador: /family
export class FamilyController {
  private readonly logger = new Logger(FamilyController.name);

  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy, // Inyecta el cliente de microservicio
  ) {}

  @Get('health') // Endpoint: GET /family/health
  async healthCheck(): Promise<string> {
    try {
      const health = await this.productClient
        .send<string>({ cmd: 'health-family' }, {}) // Envía un comando al microservicio
        .toPromise(); // Convierte el Observable en una Promesa
      return health;
    } catch (error) {
      this.logger.error('Error en healthCheck', error);
      throw new RpcException(error.message); // Maneja errores con RpcException
    }
  }

  // @MessagePattern({ cmd: 'findAll-family' })

  @Get('findAll') // Endpoint: GET /family
  async findAll(): Promise<any> {
    try {
      const families = await this.productClient
        .send<any>({ cmd: 'findAll-family' }, {}) // Envía un comando al microservicio
        .toPromise(); // Convierte el Observable en una Promesa
      return families;
    } catch (error) {
      this.logger.error('Error en findAll', error);
      throw new RpcException(error.message); // Maneja errores con RpcException
    }
  }

  // @MessagePattern({ cmd: 'create-family' })
  // async createFamily(@Payload() dto: CreateFamilyDto): Promise<Family>

  @Post('create')
  async create(@Body() dto: CreateFamilyDto): Promise<string> {
    //console.log(dto);
    //@ts-ignore
    return this.productClient.send<string>({ cmd: 'create-family' }, { dto });
  }

  //  @MessagePattern({ cmd: 'find-all-family-by-commerce-id' })

  @Get('findAllByCommerceId')
  async findAllByCommerceId(@Query('commerceId') commerceId: string) {
    try {
      const families = await this.productClient
        .send<any>({ cmd: 'find-all-family-by-commerce-id' }, { commerceId }) // Envía un comando al microservicio
        .toPromise(); // Convierte el Observable en una Promesa
      return families;
    } catch (error) {
      this.logger.error('Error en findAllByCommerceId', error);
      throw new RpcException(error.message); // Maneja errores con RpcException
    }
  }


   // updateFamily(dto: UpdateFamilyDto)
  
    //@MessagePattern({ cmd: 'update-family' })

    @Post('update')
    async update(@Body() dto: UpdateFamilyDto): Promise<string> {
      //console.log(dto);
      //@ts-ignore
      return this.productClient.send<string>({ cmd: 'update-family' }, { dto });
    }

     //@MessagePattern({ cmd: 'find-family-by-id' })

    @Get('findFamilyById')
    async findFamilyById(@Query('id') id: string) {
      try {
        const family = await this.productClient
          .send<any>({ cmd: 'find-family-by-id' }, { id }) // Envía un comando al microservicio
          .toPromise(); // Convierte el Observable en una Promesa
        return family;
      } catch (error) {
        this.logger.error('Error en findFamilyById', error);
        throw new RpcException(error.message); // Maneja errores con RpcException
      }
    }
}
