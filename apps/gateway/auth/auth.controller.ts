// apps/gateway/auth/auth.controller.ts
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../../../libs/dto/auth/user/create-user.dto';
import { ValidateUserDto } from 'libs/dto/auth/user/validate-user.dto';
import { SignInDto } from 'libs/dto/auth/user/sign-in.dto';
import { CreateCommerceDto } from 'libs/dto/commerce/commerce/create-commerce.dto';

@Controller('auth')
export class AuthController {
  // Inyección del cliente de RabbitMQ
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy, // Inyecta el cliente registrado
  ) {}

  @Get('microservice-health')
  async microServiceHealth(): Promise<string> {
    //@ts-ignore
    return this.client.send<string>({ cmd: 'health' }, {});
  }

  @Get('health')
  async health(): Promise<string> {
    return 'Auth Gateway Service is healthy';
  }


  @Get('findAllUsers')
  async findAllUsers(): Promise<string> {
    //@ts-ignore
    return this.client.send<string>({ cmd: 'find-all-users' }, {});
  }

  @Post('createUser')
  async createUser(@Body() dto: CreateUserDto): Promise<string> {
    //@ts-ignore
    return this.client.send<string>({ cmd: 'create-user' }, { dto });

    //return 'User created';
  }

  @Post('validateUser')
  async validateUser(@Body() dto: ValidateUserDto): Promise<string> {
    console.log(dto)
    //@ts-ignore
    return this.client.send<string>({ cmd: 'validate-user' }, { dto });
  }

  @Post('signIn')
  async signIn(@Body() dto: SignInDto): Promise<string> {
    //@ts-ignore
    return this.client.send<string>({ cmd: 'sign-in' }, { dto });
  }

 

   //findUserByEmail
    @Get('findUserByEmail')
    async findUserByEmail(@Query() data:string): Promise<string> {
      //@ts-ignore
      return this.client.send<string>({ cmd: 'find-user-by-email' }, { data });
    }
}
