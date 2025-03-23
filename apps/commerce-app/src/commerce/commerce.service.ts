import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Commerce } from 'libs/entities/commerce/commerce.entity';
import { ByIdDto } from 'libs/dto/common/by-id.dto';
import { CreateCommerceDto } from 'libs/dto/commerce/commerce/create-commerce.dto';
import { UpdateBasicInformationCommerceDto } from 'libs/dto/commerce/commerce/update-basic-information-commerce.dto';
import { PaymentMethodService } from '../paymentMethod/payment-method.service';
import { TaxService } from '../tax/tax.service';
import { CreateFamilyDto } from 'libs/dto/products/create-family.dto';

@Injectable()
export class CommerceService {
  constructor(
    @InjectRepository(Commerce)
    private readonly commerceRepository: Repository<Commerce>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly taxService: TaxService,
  ) {}

  async health(): Promise<string> {
    return 'Commerce Microservice is healthy';
  }

  async createCommerce(dto: CreateCommerceDto): Promise<Commerce> {
    const { name, rut, identity } = dto;


    const commerce = this.commerceRepository.create({
      name,
      rut,
      identity,
    });


    const newCommerce = await this.commerceRepository.save(commerce);

    const newPaymentMethod =
      await this.paymentMethodService.createPaymentMethod({
        name: 'Efectivo',
        credit: false,
        allowsInstallments: false,
        maxInstallments: 0,
        comission: 0,
        canBeDeleted: false,
        commerceId: newCommerce.id,
        sell: true,
        purchase: true,
      });

    const newTax = await this.taxService.createTax({
      name: 'IVA',
      percentage: 19,
      sell: true,
      purchase: true,
      canBeDeleted: false,
      commerceId: newCommerce.id,
    });

    const newFamily = await this.productClient
      .send<{ id: string }>(
        { cmd: 'create-family' },
        {
          dto: {
            name: 'General',
            description: 'Familia general',
            commerceId: newCommerce.id,
          },
        },
      )
      .toPromise();

      const familyId = newFamily.id;
      const commerceId = newCommerce.id;


      

  
    const newCategory = await this.productClient
      .send<string>(
        { cmd: 'create-category' },
        {
            name: 'General',
            commerceId: newCommerce.id,
            description: 'Categoria general',
            familyId: familyId,
        },
      )
      .toPromise();

    return newCommerce;
  }

  async findCommerceByUserId(userId: string): Promise<Commerce> {
    const user = await this.authClient
      .send<string>({ cmd: 'find-user-by-id' }, { id: userId })
      .toPromise();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const commerce = await this.commerceRepository.findOne({
      where: {
        // @ts-ignore
        id: user.commerceId,
      },
      relations: ['paymentMethods', 'taxes', 'pricesLists'],
      order: {
        paymentMethods: {
          createdAt: 'DESC', // O 'DESC' para orden descendente
        },
        taxes: {
          createdAt: 'DESC',
        },
      },
    });

    if (!commerce) {
      throw new NotFoundException('Commerce not found');
    }

    return commerce;
  }

  async updateBasicInformation(
    dto: UpdateBasicInformationCommerceDto,
  ): Promise<Commerce> {
    const commerce = await this.commerceRepository.findOneBy({
      id: dto.id,
    });
    if (!commerce) {
      throw new NotFoundException('Commerce not found');
    }

    const { address, phone, email } = dto;
    commerce.address = address;
    commerce.phone = phone;
    commerce.email = email;

    await this.commerceRepository.save(commerce);

    return commerce;
  }
}
