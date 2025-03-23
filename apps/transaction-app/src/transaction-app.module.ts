import { Module } from '@nestjs/common';
import { TransactionAppController } from './transaction-app.controller';
import { TransactionAppService } from './transaction-app.service';

@Module({
  imports: [],
  controllers: [TransactionAppController],
  providers: [TransactionAppService],
})
export class TransactionAppModule {}
