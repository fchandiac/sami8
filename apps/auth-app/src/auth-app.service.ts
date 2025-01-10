import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../libs/entities/auth/user.entity';
import { Commerce } from '../../../libs/entities/commerce/commerce.entity';
import { CreateUserDto } from 'libs/dto/auth/user/create-user.dto';
import { ValidateUserDto } from 'libs/dto/auth/user/validate-user.dto';
import { SignInDto } from 'libs/dto/auth/user/sign-in.dto';
import { RpcException } from '@nestjs/microservices';
import { ByIdDto } from 'libs/dto/common/by-id.dto';
import { UpdatePassword } from 'libs/dto/auth/user/update-password.dto';


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

    console.log('findUserByEmail', email)
    try {
      const user = await this.userRepository.findOne({
        where: { email },
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
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) {
      //   throw new NotFoundException('Invalid password');
      // }

      if (password !== user.password) {
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
      const users = await this.userRepository.find({
    
      });
      return users;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }


}
