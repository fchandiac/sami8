import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'libs/entities/product/category.entity';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { envs } from 'libs/config';
import { Product } from 'libs/entities/product/product.entity';
import { Family } from 'libs/entities/product/family.entity';
import { FamilyController } from './family/family.controller';
import { FamilyService } from './family/family.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product, Family]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.database.productDatabaseName,
      entities: [Category, Product, Family],
      synchronize: true,
      //dropSchema: true,
    }),

  ],
  controllers: [
    CategoryController,
    FamilyController
  ],
  providers: [
    CategoryService,
    FamilyService
  ],
})
export class ProductAppModule {}
