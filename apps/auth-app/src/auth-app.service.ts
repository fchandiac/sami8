import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../libs/entities/auth/user.entity';
import { CreateUserDto } from 'libs/dto/auth/user/create-user.dto';
import { ValidateUserDto } from 'libs/dto/auth/user/validate-user.dto';
import { SignInDto } from 'libs/dto/auth/user/sign-in.dto';
import { RpcException } from '@nestjs/microservices';
import { ByIdDto } from 'libs/dto/common/by-id.dto';
import { CreateCommerceDto } from 'libs/dto/auth/commerce/create-commerce.dto';
import { Commerce } from '../../../libs/entities/auth/commerce.entity';

@Injectable()
export class AuthAppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async health(): Promise<string> {
    return 'Auth Microservice is healthy';
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const { email, password } = dto;

      // Check if a user with the given email already exists
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException(`User with email ${email} already exists.`);
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the new user
      const newUser = this.userRepository.create({
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new RpcException({
          statusCode: 409,
          message: error.message,
        });
      }
      // For any other errors, throw an internal server error
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['commerces'],
      });
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found.`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
        });
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async validateUser(dto: ValidateUserDto): Promise<User> {
    try {
      const { email } = dto;
      const user = await this.findUserByEmail(email);
      return user;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Re-throw RPC exceptions to be handled by the caller
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async findUserByUserName(userName: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { userName },
        relations: ['commerces'],
      });
      if (!user) {
        throw new NotFoundException(
          `User with username ${userName} not found.`,
        );
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
        });
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async findUserById(dto: ByIdDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: dto.id },
        relations: ['commerces'],
      });
      if (!user) {
        throw new NotFoundException(`User with id ${dto.id} not found.`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
        });
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async signIn(dto: SignInDto): Promise<User> {
    try {
      const { email, password } = dto;
      const user = await this.findUserByEmail(email);

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid password');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
        });
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async deleteUser(dto: ByIdDto): Promise<User> {
    try {
      const user = await this.findUserById(dto);
      await this.userRepository.softDelete(dto.id);
      return user;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Re-throw RPC exceptions to be handled by the caller
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async createCommerce(dto: CreateCommerceDto): Promise<User> {
    try {
      const user = await this.findUserById({ id: dto.userId });
      const commerce = new Commerce();
      commerce.name = dto.name;
      commerce.user = user;
      user.commerces.push(commerce);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Re-throw RPC exceptions to be handled by the caller
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async findCommerceById(dto: ByIdDto): Promise<Commerce> {
    try {
      const user = await this.findUserById(dto);
      const commerce = user.commerces.find((c) => c.id === dto.id);
      if (!commerce) {
        throw new NotFoundException(`Commerce with id ${dto.id} not found.`);
      }
      return commerce;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new RpcException({
          statusCode: 404,
          message: error.message,
        });
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async deleteCommerce(dto: ByIdDto): Promise<User> {
    try {
      const commerce = await this.findCommerceById(dto);
      await this.userRepository
        .createQueryBuilder()
        .relation(User, 'commerces')
        .of(commerce.user)
        .remove(commerce);
      return commerce.user;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error; // Re-throw RPC exceptions to be handled by the caller
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  


}
