import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // * Use global middleware with `use()`
  // app.use(logger);

  // * Use global HttpException with `useGlobalFilters()`
  // app.useGlobalFilters(new HttpExceptionFilter());

  // * Use global Pipes with `useGlobalPipes()`
  // app.useGlobalPipes(new ValidationPipe());

  // * Use global Guards with `useGlobalGuards()`
  // app.useGlobalGuards(new RolesGuard());

  await app.listen(3000);
}
bootstrap();
