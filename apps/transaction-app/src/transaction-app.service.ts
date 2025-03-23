import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
