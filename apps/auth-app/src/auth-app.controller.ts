//apps/auth-app/src/auth-app.controller.ts
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { AuthAppService } from './auth-app.service';
import { CreateUserDto } from '../../../libs/dto/auth/user/create-user.dto';
import { User } from '../../../libs/entities/auth/user.entity';

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  // Maneja el mensaje de salud (health check)
  @MessagePattern({ cmd: 'health' })
  async health(): Promise<string> {
    return this.authAppService.health(); // Delegamos la lógica al servicio
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<User> {
    return this.authAppService.createUser(data.dto);
  }

  @MessagePattern({ cmd: 'validate-user' })
  async validateUser(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<User> {
    return this.authAppService.validateUser(data.dto);
  }
}
