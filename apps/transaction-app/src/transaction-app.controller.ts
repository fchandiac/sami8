import { Controller, Get } from '@nestjs/common';
import { TransactionAppService } from './transaction-app.service';

@Controller()
export class TransactionAppController {
  constructor(private readonly transactionAppService: TransactionAppService) {}

  @Get()
  getHello(): string {
    return this.transactionAppService.getHello();
  }
}
