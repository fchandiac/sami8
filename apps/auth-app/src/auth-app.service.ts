import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../libs/entities/auth/user.entity';
import { Commerce } from '../../../libs/entities/auth/commerce.entity';
import { CreateUserDto } from 'libs/dto/auth/user/create-user.dto';
import { ValidateUserDto } from 'libs/dto/auth/user/validate-user.dto';
import { SignInDto } from 'libs/dto/auth/user/sign-in.dto';
import { RpcException } from '@nestjs/microservices';
import { ByIdDto } from 'libs/dto/common/by-id.dto';
import { CreateCommerceDto } from 'libs/dto/auth/commerce/create-commerce.dto';
import { UpdatePassword } from 'libs/dto/auth/user/update-password.dto';
import { PaymentMethod } from 'libs/entities/auth/payment-method.entity';

@Injectable()
export class AuthAppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Commerce)
    private commerceRepository: Repository<Commerce>, 

    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
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
        ...dto,
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
      const { userName } = dto;
      const user = await this.findUserByUserName(userName);
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
      const { userName, password } = dto;
      const user = await this.findUserByUserName(userName);

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

  async updatePassword(dto: UpdatePassword): Promise<User> {
    try {
      const user = await this.findUserById({ id: dto.id });
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      user.password = hashedPassword;
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

  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find(
        {relations: ['commerces']}
      );
      return users;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async findAllCommerces(): Promise<Commerce[]> {
    try {
      const users = await this.userRepository.find({
        relations: ['commerces'],
      });
      const commerces = users.flatMap((u) => u.commerces);
      return commerces;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async findCommercesByUserId(dto: ByIdDto): Promise<Commerce[]> {
    try {
      const user = await this.findUserById(dto);
      return user.commerces;
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


  async createCommerce(dto: CreateCommerceDto): Promise<Commerce> {
    try {
      const user = await this.findUserById({ id: dto.userId });
      const { name, rut, liorenToken} = dto;
      const commerce = this.commerceRepository.create({
        name,
        rut,
        liorenToken,
        user,
      });
      await this.commerceRepository.save(commerce);
      
    
      return commerce;
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
