import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CommerceModule } from '../commerce/commerce.module';



@Module({
  imports: [AuthModule, CommerceModule],
  controllers: [],
  providers: []
})
export class GatewayModule {}
