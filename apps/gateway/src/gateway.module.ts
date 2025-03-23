import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CommerceModule } from '../commerce/commerce.module';
import { ProductModule } from '../product/product.module';



@Module({
  imports: [AuthModule, CommerceModule, ProductModule ],
  controllers: [],
  providers: []
})
export class GatewayModule {}
