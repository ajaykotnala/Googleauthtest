import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const prismaService = app.get(PrismaService);

  await app.listen(3001);
}
bootstrap();
