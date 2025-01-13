import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tax } from 'libs/entities/commerce/tax.entity';
import { Repository } from 'typeorm';
import { CreateTaxDto } from 'libs/dto/commerce/tax/create-tax.dto';
import { UpdateTaxDto } from 'libs/dto/commerce/tax/update-tax.dto';
import { Commerce } from 'libs/entities/commerce/commerce.entity';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(Tax)
    private readonly taxRepository: Repository<Tax>,
    @InjectRepository(Commerce)
    private readonly commerceRepository: Repository<Commerce>,
  ) {}

  async health(): Promise<string> {
    return 'Tax Microservice is healthy';
  }

  async createTax(dto: CreateTaxDto): Promise<Tax> {
    const { name, percentage, sell, purchase, canBeDeleted, commerceId } = dto;

    const commerce = await this.commerceRepository.findOne({
      where: {
        id: commerceId,
      },
    });

    if (!commerce) {
      throw new NotFoundException('Commerce not found');
    }

    const tax = this.taxRepository.create({
      name,
      percentage,
      sell,
      purchase,
      canBeDeleted,
    });

    tax.commerce = commerce;
    return this.taxRepository.save(tax);
  }

  async updateTax(dto: UpdateTaxDto): Promise<Tax> {
    const { id, name, percentage, sell, purchase } = dto;

    const tax = await this.taxRepository.findOne({
      where: {
        id,
      },
    });

    if (!tax) {
      throw new NotFoundException('Tax not found');
    }

    tax.name = name;
    tax.percentage = percentage;
    tax.sell = sell;
    tax.purchase = purchase;

    return this.taxRepository.save(tax);
  }

  async deleteTax(id: string): Promise<Tax> {
    const tax = await this.taxRepository.findOne({
      where: {
        id,
      },
    });

    if (!tax) {
      throw new NotFoundException('Tax not found');
    }

    return this.taxRepository.remove(tax);
  }

  
}
