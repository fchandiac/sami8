import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Family } from 'libs/entities/product/family.entity';
import { CreateFamilyDto } from 'libs/dto/products/create-family.dto';
import { UpdateFamilyDto } from 'libs/dto/products/update-family.dto';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
  ) {}

  async health(): Promise<string> {
    return 'Family Microservice is healthy';
  }

  async findAll(): Promise<Family[]> {
    return this.familyRepository.find();
  }

  async createFamily(dto: any): Promise<Family> {
    // Verifica que el DTO tenga el campo 'name'
    if (!dto.name) {
      throw new Error('El campo "name" es obligatorio.');
    }

    // Crea una nueva instancia de Family con los datos del DTO
    const family = new Family();
    family.name = dto.name;
    family.description = dto.description;
    family.commerceId = dto.commerceId;

    // Guarda la familia en la base de datos
    return this.familyRepository.save(family);
  }

  async findAllByCommerceId(commerceId: string): Promise<Family[]> {
    return this.familyRepository.find({ where: { commerceId } });
  }

  async updateFamily(dto: UpdateFamilyDto): Promise<Family> {
    // Busca la familia en la base de datos
    const family = await this.familyRepository.findOne({
      where: { id: dto.id },
    });

    // Si no existe, lanza un error
    if (!family) {
      throw new Error('Familia no encontrada');
    }

    // Actualiza los campos de la familia
    family.name = dto.name;
    family.description = dto.description;

    // actualmente no dejaremos la opcion de actulizar la familia.

    // Guarda los cambios en la base de datos
    return this.familyRepository.save(family);
  }

  async findFamilyById(id: string): Promise<Family> {
    return this.familyRepository.findOne({
      where: { id },
    });
  }
}
