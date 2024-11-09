import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthAppModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
