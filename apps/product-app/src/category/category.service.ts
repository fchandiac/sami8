import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Category } from 'libs/entities/product/category.entity';
import { Family } from 'libs/entities/product/family.entity';
import { CreateCategoryDto } from 'libs/dto/products/create-category.dto';
import { UpdateCategoryDto } from 'libs/dto/products/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
  ) {}

  async health(): Promise<string> {
    return 'Category Microservice is healthy';
  }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const { name, description, familyId, commerceId } = dto;
    
    const family = await this.familyRepository.findOne({
      where: { id: familyId },
    });

    const category = new Category();
    category.name = name;
    category.description = description;
    category.family = family;
    category.commerceId = commerceId;

    try {
      await this.categoryRepository.save(category);
    } catch (error) {
      throw new ConflictException(error.message);
    }

    return category;
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  //findAllByCommerceId
  async findAllByCommerceId(commerceId: string): Promise<Category[]> {
    return this.categoryRepository.find({ where: { commerceId }, relations: ['family'] });
  }

  //UpdateCtegory
  async updateCategory(dto: UpdateCategoryDto): Promise<Category> {
    const { id, name, description, familyId } = dto;

    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const family = await this.familyRepository.findOne({
      where: { id: familyId },
    });

    category.name = name;
    category.description = description;
    category.family = family;

    try {
      await this.categoryRepository.save(category);
    } catch (error) {
      throw new ConflictException(error.message);
    }

    return category;
  }


}
